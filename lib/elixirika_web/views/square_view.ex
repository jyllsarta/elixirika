defmodule ElixirikaWeb.SquareView do
  use ElixirikaWeb, :view
  def render("register_log.json", _params) do
    %{
      status: "succeeded"
    }
  end
end
