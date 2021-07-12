defmodule ElixirikaWeb.ZxcvView do
  use ElixirikaWeb, :view

  def render("ranking.json", %{ranking: ranking}) do
    %{
      ranking: ranking
    }
  end
end
