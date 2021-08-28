defmodule Elixirika.SquareScore do
  use Yacto.Schema, dbname: :default
  @derive {Jason.Encoder, only: [:score, :username]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :username, :string, default: "", meta: [null: false]
    field :playlog, :string, meta: [type: :text]
    timestamps()
  end
end
