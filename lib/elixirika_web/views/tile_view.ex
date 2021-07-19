defmodule ElixirikaWeb.TileView do
  use ElixirikaWeb, :view

  def render("new.json", %{board: board}) do
    board
  end
  def render("high_score.json", %{high_score: high_score}) do
    high_score
  end
  def render("create.json", %{is_high_score: is_high_score}) do
    %{
      is_high_score: is_high_score
    }
  end
end
