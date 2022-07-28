defmodule ElixirikaWeb.TileController do
  use ElixirikaWeb, :controller
  require IEx

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html", title: title("しろこのカラータイル"), og: custom_og(), row: 20, column: 10)
  end

  def howto(conn, _params) do
    conn
    |> put_layout(false)
    |> render("howto.html", title: title("しろこのカラータイル"), og: custom_og(), row: 20, column: 10)
  end

  def new(conn, _params) do
    # rubyコマンドは若干重い...
    board =
      :os.cmd('cd /home/jyll/elixirika/lib/ruby/; ruby tile_cli.rb')
      |> Jason.decode!()

    conn
    |> render("new.json", board: board)
  end

  def high_score(conn, params) do
    high_score = Elixirika.TileScore.high_scores(params["username"])

    conn
    |> render("high_score.json", high_score: high_score)
  end

  def result_index(conn, _params) do
    ranking = %{
      score_rank_easy: Elixirika.TileScore.ranking(1),
      score_rank_normal: Elixirika.TileScore.ranking(2),
      score_rank_hard: Elixirika.TileScore.ranking(3),
      time_rank_easy: Elixirika.TileScore.time_ranking(1),
      time_rank_normal: Elixirika.TileScore.time_ranking(2),
      time_rank_hard: Elixirika.TileScore.time_ranking(3)
    }

    conn
    |> put_layout(false)
    |> render("result_index.html", og: custom_og(), ranking: ranking)
  end

  def create(conn, params) do
    require Ecto.Query

    seed = params["playlog"]["seed"] |> String.to_integer()
    w = params["playlog"]["w"] |> String.to_integer()
    h = params["playlog"]["h"] |> String.to_integer()
    colors = params["playlog"]["colors"] |> String.to_integer()
    pairs = params["playlog"]["pairs"] |> String.to_integer()
    difficulty = params["difficulty"] |> String.to_integer()
    clicklogs = params["playlog"]["messages"]["click"] |> Jason.encode!()
    remain_time = params["remain_time"] |> Float.parse() |> elem(0) |> Float.round(3)

    arg =
      [seed, "'" <> clicklogs <> "'", w, h, colors, pairs, difficulty]
      |> Enum.map(&to_charlist/1)
      |> :string.join(' ')

    sim =
      :os.cmd('cd /home/jyll/elixirika/lib/ruby/; ruby tile_result_cli.rb ' ++ arg)
      |> Jason.decode!()

    score = %Elixirika.TileScore{
      seed: seed,
      remain_time: remain_time,
      username: params["username"],
      score: sim["score"],
      playlog: params["playlog"] |> Jason.encode!(),
      difficulty: difficulty,
      extinct: sim["extinct"]
    }

    Elixirika.Repo.insert(score)

    is_high_score = Elixirika.TileScore.high_score?(params["username"], difficulty, sim["score"])
    is_best_time = Elixirika.TileScore.best_time?(params["username"], difficulty, remain_time)
    extinct = sim["extinct"]

    result = %{
      score: sim["score"],
      is_high_score: is_high_score,
      is_best_time: is_best_time,
      time: remain_time,
      extinct: extinct
    }

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
      site_name: "さーたはうす"
    }
  end
end
