defmodule ElixirikaWeb.ZxcvController do
  use ElixirikaWeb, :controller
  """
    def index
    end
    def create
      result = ZxcvScore.create(parameter)
      render json: {is_high_score: result.high_score?}.to_json
    end
    def high_score
      high_score = ZxcvScore.high_score(params[:username])
      render json: {high_score: high_score}.to_json
    end
    def ranking
      ranking = ZxcvScore.ranking(10)
      render json: {ranking: ranking}.to_json
    end

  private
    def parameter
      params.permit([:username, :speed_score, :score, :total_score])
    end
  """
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
    ranking = Ecto.Query.from(score in Elixirika.ZxcvScore, order_by: [desc: score.total_score]) |> Ecto.Query.limit(5) |> Elixirika.Repo.all
    conn
    |> render("ranking.json", ranking: ranking)
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
