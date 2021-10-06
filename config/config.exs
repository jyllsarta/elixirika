# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :elixirika, Elixirika.Repo,
  adapter: Ecto.Adapters.MyXQL,
  database: "elixirika_repo",
  username: "root",
  password: "",
  hostname: "127.0.0.1"

config :elixirika,
  ecto_repos: [Elixirika.Repo]

# Configures the endpoint
config :elixirika, ElixirikaWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "0CHyZ5HZ73OOZEdv9Ef+Nl0UoktTcgL4YDCRXoGTqqI/Hp5IskWcWX/uTq1Wk5RF",
  render_errors: [view: ElixirikaWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Elixirika.PubSub,
  live_view: [signing_salt: "qRtniQMS"],
  http: [protocol_options: [max_request_line_length: 65536, max_header_value_length: 65536]]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"

# slimex
config :phoenix, :template_engines,
  slim: PhoenixSlime.Engine,
  slime: PhoenixSlime.Engine,
  # If you want to use LiveView
  slimleex: PhoenixSlime.LiveViewEngine

config :phoenix_slime, :use_slim_extension, true

config :yacto, :databases, %{
  default: %{
    module: Yacto.DB.Single,
    repo: Elixirika.Repo
  }
}
