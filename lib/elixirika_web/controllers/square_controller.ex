defmodule ElixirikaWeb.SquareController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
  end

  def status(conn, params) do
    username = params["username"]

    status = %{
      high_score: Elixirika.SquareScore.high_score(username)
    }

    conn
    |> render("status.json", status: status)
  end

  def register_log(conn, params) do
    log = Jason.encode!(params["log"])
    cmd = ~s(cd assets/js/pirika_js/square/packs; node cli.js '#{log}' #{params["seed"]})
    :os.cmd(to_charlist(cmd))
    result = File.read!("/tmp/square_result_#{params["seed"]}.json") |> Jason.decode!()

    score = %Elixirika.SquareScore{
      username: params["username"],
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
