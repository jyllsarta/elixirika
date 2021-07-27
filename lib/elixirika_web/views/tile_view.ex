defmodule ElixirikaWeb.TileView do
  use ElixirikaWeb, :view

  def render("new.json", %{board: board}) do
    board
  end

  def render("high_score.json", %{high_score: high_score}) do
    high_score
  end

  def render("create.json", %{result: result}) do
    result
  end
end
