defmodule Elixirika.Repo do
  use Ecto.Repo,
    otp_app: :elixirika,
    adapter: Ecto.Adapters.Postgres
end
