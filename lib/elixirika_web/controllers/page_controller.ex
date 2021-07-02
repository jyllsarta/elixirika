defmodule ElixirikaWeb.PageController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def games(conn, _params) do
    conn
    # |> put_layout(false)
    |> render("games.html")
  end

  def twitter_webhook(conn, _params) do
    conn
    |> render("twitter_webhook.html")
  end

  def airryr_introduction(conn, _params) do
    conn
    |> render("airryr_introduction.html")
  end
end
