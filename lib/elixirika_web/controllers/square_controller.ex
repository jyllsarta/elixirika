defmodule ElixirikaWeb.SquareController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
  end

  def status(conn, params) do
    user_id = Elixirika.SquareUser.find_by(params["username"])
    # HACK: user_id: nil で検索はできないので、AUTO INCREMENT 的にuser_id: 0は入らないことを悪用して検索を空振らせている
    user_id = if user_id == nil, do: 0, else: user_id

    status = %{
      high_score: Elixirika.SquareScore.high_score(user_id)
    }

    conn
    |> render("status.json", status: status)
  end

  def register_log(conn, params) do
    log = Jason.encode!(params["log"])
    cmd = ~s(cd assets/js/pirika_js/square/packs; node cli.js '#{log}' #{params["seed"]})
    :os.cmd(to_charlist(cmd))
    {ret_status, content} = File.read("/tmp/square_result_#{params["seed"]}.json")
    # Elixirにおいてこれくらいの用事で例外を使うべきかどうかは議論がありそうだが、個人的にこれだけ簡単にエラー処理を定義できるのは利益が大きいと思う
    if ret_status != :ok, do: raise ElixirikaWeb.InvalidOperationError

    result = content |> Jason.decode!()

    # TODO: result["challenges"] をもとに実積のクリアを判定する

    user_id = Elixirika.SquareUser.find_or_create_by(params["username"])
    score = %Elixirika.SquareScore{
      user_id: user_id,
      character_id: params["log"]["characterId"],
      score: result["score"],
      playlog: log
    }

    Elixirika.Repo.insert(score)
    File.rm("/tmp/square_result_#{params["seed"]}.json")

    conn
    |> render("register_log.json", %{})
  end

  defp title(title) do
    title <> " - さーたはうす"
  end
end
