defmodule ElixirikaWeb.PageController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
