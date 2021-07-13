defmodule ElixirikaWeb.ZxcvView do
  use ElixirikaWeb, :view

  def render("ranking.json", %{ranking: ranking}) do
    %{
      ranking: ranking
    }
  end
  def render("high_score.json", %{high_score: high_score}) do
    %{
      high_score: high_score
    }
  end
end
