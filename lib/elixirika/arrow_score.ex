defmodule Elixirika.ArrowScore do
  use Yacto.Schema, dbname: :default
  @derive {Jason.Encoder, only: [:score, :remove_score, :time_score, :username]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :remove_score, :integer, default: 0, meta: [null: false]
    field :time_score, :integer, default: 0, meta: [null: false]
    field :username, :string, default: "", meta: [null: false]
    timestamps()
  end
end
