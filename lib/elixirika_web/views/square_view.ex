defmodule ElixirikaWeb.SquareView do
  use ElixirikaWeb, :view

  def render("register_log.json", _params) do
    %{
      status: "succeeded"
    }
  end

  def render("status.json", %{status: status}) do
    status
  end

  def render("ranking.json", %{ranking: ranking}) do
    %{ranking: ranking}
  end
end
