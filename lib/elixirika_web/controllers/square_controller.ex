defmodule ElixirikaWeb.SquareController do
  use ElixirikaWeb, :controller

  @max_log_size 50000

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
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

  def register_log(conn, params) do
    log = Jason.encode!(params["log"])
    if String.length(log) >= @max_log_size, do: raise(ElixirikaWeb.PlaylogTooLongError)
    cmd = ~s(cd assets/js/pirika_js/square/packs; node cli.js '#{log}' #{params["seed"]})
    IO.puts(cmd)
    :os.cmd(to_charlist(cmd))
    {ret_status, content} = File.read("/tmp/square_result_#{params["seed"]}.json")

    if ret_status != :ok, do: raise(ElixirikaWeb.InvalidOperationError)

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

  defp title(title) do
    title <> " - さーたはうす"
  end
end
