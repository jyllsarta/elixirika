defmodule ElixirikaWeb.ZxcvController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    custom_og = %{
      description: "流れてくるノーツを自分のペースでひたすら打ち込み続けるゲームです。ブラウザですぐ遊べます。",
      title: "ZXCV",
      url: "https://jyllsarta.net/zxcv",
      image: "https://jyllsarta.github.io/images/tile/ogp_image.png",
      site_name: "さーたはうす",
    }

    conn
    |> render("index.html", title: title("ZXCV"), og: default_og())
  end

  def ranking(conn, _params) do
    require Ecto.Query
    ranking = Ecto.Query.from(score in Elixirika.ZxcvScore, order_by: [desc: score.total_score]) |> Ecto.Query.limit(1000) |> Elixirika.Repo.all
    distinct_ranking = Enum.uniq_by(ranking, &(&1.username)) |> Enum.take(10)
    conn
    |> render("ranking.json", ranking: distinct_ranking)
  end

  def high_score(conn, params) do
    require Ecto.Query
    high_score_record = Ecto.Query.from(score in Elixirika.ZxcvScore, order_by: [desc: score.total_score])
                  |> Ecto.Query.limit(1)
                  |> Ecto.Query.where(username: ^params["username"])
                  |> Elixirika.Repo.one
    # モデルに生やすべきなんだろうけど一旦動作優先で横着しちゃう
    total_score = if high_score_record != nil, do: high_score_record.total_score, else: 0
    conn
    |> render("high_score.json", high_score: total_score)
  end

  def create(conn, params) do
    require Ecto.Query
    score = %Elixirika.ZxcvScore{
              username: params["username"],
              score: params["score"],
              total_score: params["total_score"],
              speed_score: params["speed_score"]
            }
    Elixirika.Repo.insert(score)

    high_score_record = Ecto.Query.from(score in Elixirika.ZxcvScore, order_by: [desc: score.total_score])
                  |> Ecto.Query.limit(1)
                  |> Ecto.Query.where(username: ^params["username"])
                  |> Elixirika.Repo.one
    total_score = if high_score_record != nil, do: high_score_record.total_score, else: 0

    conn
    |> render("create.json", is_high_score: params["total_score"] >= total_score)
  end

  # デフォルトのogタグとtitleを出力
  defp title do
    default_title
  end
  defp title(title) do
    title <> " - " <> default_title    
  end
  defp default_title() do
    "さーたはうす"
  end
  defp default_og() do
    %{
      description: "じぃるの制作物をまとめるサイトです。ブラウザゲーとお絵かきログを置いてます。",
      title: "さーたはうす",
      url: "https://jyllsarta.net/",
      image: "https://jyllsarta.github.io/images/icon/ogp_image.png",
      site_name: "さーたはうす",
    }
  end
end
