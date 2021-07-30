defmodule Elixirika.ZxcvScore do
  use Yacto.Schema, dbname: :default
  @derive {Jason.Encoder, only: [:score, :speed_score, :total_score, :username]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :speed_score, :integer, default: 0, meta: [null: false]
    field :total_score, :integer, default: 0, meta: [null: false]
    field :username, :string, default: "", meta: [null: false]
    timestamps()
  end
end
