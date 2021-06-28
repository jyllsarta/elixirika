defmodule ElixirikaWeb.PageController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end

  def games(conn, _params) do
    render(conn, "games.html")
  end
end
