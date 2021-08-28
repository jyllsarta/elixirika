defmodule ElixirikaWeb.SquareController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    custom_og = %{
      description: "",
      title: "SquarE RooT",
      url: "https://jyllsarta.net/square",
      image: "https://jyllsarta.github.io/images/tile/ogp_image.png",
      site_name: "さーたはうす"
    }
 
    conn
    |> put_layout(false)
    |> render("index.html")
  end

  def register_log(conn, params) do
    # TODO: 検証とログの記録
    conn
    |> render("register_log.json", %{})
  end

  defp title(title) do
    title <> " - さーたはうす"
  end
end
