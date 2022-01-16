defmodule ElixirikaWeb.SquareController do
  use ElixirikaWeb, :controller

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
    cmd = ~s(cd assets/js/pirika_js/square/packs; node cli.js '#{log}' #{params["seed"]})
    IO.puts(cmd)
    :os.cmd(to_charlist(cmd))
    {ret_status, content} = File.read("/tmp/square_result_#{params["seed"]}.json")

    # Elixirにおいてこれくらいの用事で例外を使うべきかどうかは議論がありそうだが、個人的にこれだけ簡単にエラー処理を定義できるのは利益が大きいと思う
    if ret_status != :ok, do: raise(ElixirikaWeb.InvalidOperationError)

    result = content |> Jason.decode!()

    user_id = Elixirika.SquareUser.find_or_create_by(params["username"] || "")
    chapter_id = params["log"]["chapterId"]

    # TODO: クリアした実績数でNクエリ走るのでBULK INSERTにしたい
    Enum.map(
      result["challenges"],
      &Elixirika.SquareChallenge.register!(user_id, &1, chapter_id)
    )

    score = %Elixirika.SquareScore{
      user_id: user_id,
      chapter_id: chapter_id,
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
