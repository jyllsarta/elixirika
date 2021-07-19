defmodule ElixirikaWeb.TileController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html", title: title("しろこのカラータイル"), og: custom_og(), row: 20, column: 10)
  end

  def new(conn, _params) do
    board = File.read!("assets/static/etc/board.json")
      |> Jason.decode!
    conn
      |> render("new.json", board: board)
  end

  def high_score(conn, _params) do
    # TODO: impl
    high_score = %{
      score_easy: 100,
      score_normal: 200,
      score_hard: 300,
      time_easy: nil,
      time_normal: nil,
      time_hard: nil,
    }
    conn
      |> render("high_score.json", high_score: high_score)
  end

  defp title(title) do
    title <> " - " <> default_title()
  end
  defp default_title() do
    "さーたはうす"
  end
  defp custom_og() do
     %{
      description: "かりかりタイルを剥がしていくミニゲームです。ブラウザですぐ遊べます。",
      title: "しろこのカラータイル",
      url: "https://jyllsarta.net/tile",
      image: "https://jyllsarta.github.io/images/tile/ogp_image.png",
      site_name: "さーたはうす",
    }
  end
end
