defmodule ElixirikaWeb.TileController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html", title: title("しろこのカラータイル"), og: custom_og(), row: 20, column: 10)
  end

  def new(conn, _params) do
    # rubyコマンドは若干重い...
    board = :os.cmd('cd lib/ruby/; ruby tile_cli.rb')
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

  def create(conn, _params) do
    """
      seed = params[:playlog][:seed].to_i
      clicklogs = params[:playlog][:messages] ? params[:playlog][:messages][:click] : {}
      w = params[:playlog][:w].to_i
      h = params[:playlog][:h].to_i
      colors = params[:playlog][:colors].to_i
      pairs = params[:playlog][:pairs].to_i
      difficulty = params[:difficulty].to_i
      remain_time = params[:remain_time].to_f.round(3)
      username = params[:username]
      sim = ColorTileLogic::ColorTileSimulator.new(seed, clicklogs, w, h, colors, pairs, difficulty)
      score = sim.score
      extinct = sim.extinct?

      is_high_score = Result.high_score?(username, difficulty, score)
      is_best_time = extinct && Result.best_time?(username, difficulty, remain_time)

      Result.create!(
        seed: seed,
        score: score,
        username: username,
        playlog: clicklogs.try(:permit!).try(:to_h) || {},
        difficulty: difficulty,
        remain_time: remain_time,
        extinct: extinct || false
      )
      render json: {score: score, is_high_score: is_high_score, is_best_time: is_best_time, time: remain_time, extinct: extinct}
    """
    score = 100
    is_high_score = false
    is_best_time = false
    remain_time = nil
    extinct = false
    result = %{score: score, is_high_score: is_high_score, is_best_time: is_best_time, time: remain_time, extinct: extinct}
    conn
      |> render("create.json", result: result)
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
