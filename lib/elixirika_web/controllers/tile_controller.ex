defmodule ElixirikaWeb.TileController do
  use ElixirikaWeb, :controller

  def index(conn, _params) do
    conn
    |> put_layout(false)
    |> render("index.html", title: title("しろこのカラータイル"), og: custom_og(), row: 20, column: 10)
  end

  defp title(title) do
    title <> " - " <> default_title    
  end
  defp default_title() do
    "さーたはうす"
  end
  defp custom_og() do
     %{
      description: "かりかりタイルを剥がしていくミニゲームです。ブラウザですぐ遊べます。",
      title: "しろこのカラータイル",
      url: "https://jyllsarta.net/tile",
      image: "https://jyllsarta.github.io/images/tile/ogp_image.png",
      site_name: "さーたはうす",
    }
  end
end
