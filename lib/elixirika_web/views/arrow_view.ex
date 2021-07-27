defmodule ElixirikaWeb.ArrowView do
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

  def render("create.json", %{is_high_score: is_high_score}) do
    %{
      is_high_score: is_high_score
    }
  end
end
