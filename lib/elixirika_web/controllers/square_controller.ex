defmodule ElixirikaWeb.SquareController do
  use ElixirikaWeb, :controller

  @max_log_size 50000

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
  end

  def admin(conn, _params) do
    messages = Elixirika.SquareMessage.recent()
    csrf_token = Phoenix.Controller.get_csrf_token()

    conn
    |> put_layout(false)
    |> render("admin.html", messages: messages, csrf_token: csrf_token)
  end

  def admin_update(conn, params) do
    %{"passcode" => passcode, "response" => response, "id" => id} = params
    delete = Map.get(params, "delete")
    validate_passcode(passcode)
    id = String.to_integer(id)

    if(delete) do
      Elixirika.SquareMessage.delete!(id)      
    else
      Elixirika.SquareMessage.update!(id, response)
    end

    conn
    |> redirect(to: "/square/admin")
  end

  def messages(conn, _params) do
    messages = Elixirika.SquareMessage.recent()

    conn
    |> render("messages.json", messages: messages)
  end

  def create_message(conn, params) do
    %{"username" => username, "message" => message} = params
    id = Elixirika.SquareUser.find_by(username || "") || 0
    Elixirika.SquareMessage.register!(id, message)

    conn
    |> render("create_message.json", %{})
  end

  def status(conn, params) do
    # HACK: user_id: nil で検索はできないので、AUTO INCREMENT 的にuser_id: 0は入らないことを悪用して検索を空振らせている
    user_id = Elixirika.SquareUser.find_by(params["username"] || "") || 0

    status = %{
      high_score: Elixirika.SquareScore.high_score(user_id),
      challenges: Elixirika.SquareChallenge.status(user_id)
    }

    conn
    |> render("status.json", status: status)
  end

  def ranking(conn, _params) do
    ranking = %{
      "1": Elixirika.SquareScore.ranking([1, 2, 3, 4]),
      "2": Elixirika.SquareScore.ranking([5, 6, 7, 8]),
      "3": Elixirika.SquareScore.ranking([9, 10,11,12]),
      "4": Elixirika.SquareScore.ranking([13,14,15,16]),
      total: Elixirika.SquareScore.total_ranking()
    }

    conn
    |> render("ranking.json", ranking: ranking)
  end

  def register_log(conn, params) do
    log = Jason.encode!(params["log"])
    if String.length(log) >= @max_log_size do
      IO.puts("raise PlaylogTooLongError: #{params["seed"]}")
      raise(ElixirikaWeb.PlaylogTooLongError)
    end
    cmd = ~s(cd assets/js/pirika_js/square/packs; node cli.js '#{log}' #{params["seed"]})
    IO.puts(cmd)
    IO.inspect(:os.cmd(to_charlist("pwd")))
    IO.inspect(:os.cmd(to_charlist(cmd)))
    {ret_status, content} = File.read("/tmp/square_result_#{params["seed"]}.json")

    if ret_status != :ok do
      IO.puts("raise InvalidOperationError: #{params["seed"]}")
      IO.inspect(ret_status)
      IO.inspect(content)
      raise(ElixirikaWeb.InvalidOperationError)
    end

    result = content |> Jason.decode!()

    user_id = Elixirika.SquareUser.find_or_create_by(params["username"] || "")
    chapter_id = params["log"]["chapterId"]

    # TODO: クリアした実績数でNクエリ走るのでBULK INSERTにしたい
    Enum.map(
      result["challenges"],
      &Elixirika.SquareChallenge.register!(user_id, &1, chapter_id)
    )

    Elixirika.SquareScore.register!(user_id, chapter_id, result["score"])

    File.rm("/tmp/square_result_#{params["seed"]}.json")

    conn
    |> render("register_log.json", %{})
  end


  defp validate_passcode(passcode) do
    system_passcode = "ADMIN_MESSAGE_UPDATE_KEY" |> System.get_env()
    IO.inspect("PC: #{passcode}, SPC:#{system_passcode}")

    if is_nil(system_passcode) || system_passcode != passcode do
      raise(ElixirikaWeb.PasscodeError)
    end
  end
end
