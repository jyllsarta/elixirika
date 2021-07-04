defmodule ElixirikaWeb.PageController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html", title: title, og: default_og())
  end

  def games(conn, _params) do
    conn
    |> render("games.html", title: title("Games"), og: default_og())
  end

  def works(conn, _params) do
    conn
    |> render("works.html", title: title("Works"), og: default_og())
  end

  def twitter_webhook(conn, _params) do
    conn
    |> render("twitter_webhook.html", title: title("なぜTwitterはUserStreamを廃止したがるのか"), og: default_og())
  end

  def ika(conn, _params) do
    conn
    |> render("ika.html", title: title("キャベツを我慢するフグ"), og: default_og())
  end

  def illusts(conn, _params) do
    conn
    |> render("illusts.html", title: title("Illusts"), og: default_og())
  end

  def airryr_introduction(conn, _params) do
    conn
    |> render("airryr_introduction.html", title: title("部屋の空気が悪くなるとtwitterで通知を送ってくれるbotを作った話"), og: default_og())
  end

  def rakugaki(conn, _params) do
    conn
    |> render("rakugaki.html", title: title("Illusts(rakugeki)"), og: default_og())
  end

  def sainokawara(conn, _params) do
    conn
    |> render("sainokawara.html", title: title("賽の河原"), og: default_og())
  end

  def samusugi(conn, _params) do
    conn
    |> render("samusugi.html", title: title("寒すぎて%sになった"), og: default_og())
  end

  # layout falses

  def neko(conn, _params) do
    conn
    |> put_layout(false)
    |> render("neko.html")
  end
  def nekomanual(conn, _params) do
    conn
    |> put_layout(false)
    |> render("nekomanual.html")
  end
  def neko2(conn, _params) do
    conn
    |> put_layout(false)
    |> render("neko2.html")
  end
  def snipon(conn, _params) do
    conn
    |> put_layout(false)
    |> render("snipon.html")
  end
  def touzoku(conn, _params) do
    conn
    |> put_layout(false)
    |> render("touzoku.html")
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
