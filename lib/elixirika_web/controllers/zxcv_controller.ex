defmodule ElixirikaWeb.ZxcvController do
  use ElixirikaWeb, :controller

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
