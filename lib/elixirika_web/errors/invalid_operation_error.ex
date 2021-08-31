defmodule ElixirikaWeb.InvalidOperationError do
  defexception message: "Bad Request", accepts: [], plug_status: 400
end
