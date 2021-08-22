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
    |> render("index.html", title: title("SquarE"), og: custom_og, extra: %{})
  end

  defp title(title) do
    title <> " - さーたはうす"
  end
end
