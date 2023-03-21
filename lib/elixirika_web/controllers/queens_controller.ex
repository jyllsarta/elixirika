defmodule ElixirikaWeb.QueensController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html")
  end
end
