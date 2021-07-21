defmodule Elixirika.TileScore do
  use Yacto.Schema, dbname: :default
  @derive {Jason.Encoder, only: [:score, :username, :difficulty, :remain_time]}

  schema @auto_source do
    field :seed,        :integer, default: 0,  meta: [null: false]
    field :score,       :integer, default: 0,  meta: [null: false]
    field :username,    :string,  default: "", meta: [null: false]
    field :playlog,     :integer, default: 0,  meta: [null: false]
    field :difficulty,  :integer, default: 0,  meta: [null: false]
    field :remain_time, :integer, default: 0,  meta: [null: false]
  end
end
