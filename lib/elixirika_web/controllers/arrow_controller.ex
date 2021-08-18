defmodule ElixirikaWeb.ArrowController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    custom_og = %{
      description: "ひたすら避けるゲームなのです。ブラウザですぐ遊べます。",
      title: "ICE BREAK",
      url: "https://jyllsarta.net/arrow",
      image: "https://jyllsarta.github.io/images/tile/ogp_image.png",
      site_name: "さーたはうす"
    }

    conn
    |> render("index.html", title: title("ICE BREAK"), og: custom_og)
  end

  def ranking(conn, _params) do
    require Ecto.Query

    ranking =
      Ecto.Query.from(score in Elixirika.ArrowScore, order_by: [desc: score.score])
      |> Ecto.Query.limit(1000)
      |> Elixirika.Repo.all()

    distinct_ranking = Enum.uniq_by(ranking, & &1.username) |> Enum.take(10)

    conn
    |> render("ranking.json", ranking: distinct_ranking)
  end

  def high_score(conn, params) do
    require Ecto.Query

    high_score_record =
      Ecto.Query.from(score in Elixirika.ArrowScore, order_by: [desc: score.score])
      |> Ecto.Query.limit(1)
      |> Ecto.Query.where(username: ^params["username"])
      |> Elixirika.Repo.one()

    # モデルに生やすべきなんだろうけど一旦動作優先で横着しちゃう
    score = if high_score_record != nil, do: high_score_record.score, else: 0

    conn
    |> render("high_score.json", high_score: score)
  end

  def create(conn, params) do
    require Ecto.Query

    score = %Elixirika.ArrowScore{
      username: params["username"],
      score: params["score"],
      remove_score: params["remove_score"],
      time_score: params["time_score"]
    }

    Elixirika.Repo.insert(score)

    high_score_record =
      Ecto.Query.from(score in Elixirika.ArrowScore, order_by: [desc: score.score])
      |> Ecto.Query.limit(1)
      |> Ecto.Query.where(username: ^params["username"])
      |> Elixirika.Repo.one()

    score = if high_score_record != nil, do: high_score_record.score, else: 0

    conn
    |> render("create.json", is_high_score: params["score"] >= score)
  end

  # デフォルトのogタグとtitleを出力
  defp title(title) do
    title <> " - " <> default_title()
  end

  defp default_title() do
    "さーたはうす"
  end
end
