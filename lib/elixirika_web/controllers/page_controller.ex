defmodule ElixirikaWeb.PageController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def games(conn, _params) do
    conn
    |> render("games.html")
  end

  def works(conn, _params) do
    conn
    |> render("works.html")
  end

  def twitter_webhook(conn, _params) do
    conn
    |> render("twitter_webhook.html")
  end

  def ika(conn, _params) do
    conn
    |> render("ika.html")
  end

  def illusts(conn, _params) do
    conn
    |> render("illusts.html")
  end

  def airryr_introduction(conn, _params) do
    conn
    |> render("airryr_introduction.html")
  end

  def rakugaki(conn, _params) do
    conn
    |> render("rakugaki.html")
  end

  def sainokawara(conn, _params) do
    conn
    |> render("sainokawara.html")
  end

  def samusugi(conn, _params) do
    conn
    |> render("samusugi.html")
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
end
