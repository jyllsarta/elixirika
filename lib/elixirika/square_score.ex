defmodule Elixirika.SquareScore do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :username]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :username, :string, default: "", meta: [null: false]
    field :playlog, :string, meta: [type: :text]
    timestamps()
  end

  def high_score(username) do
    record =
      Ecto.Query.from(score in Elixirika.SquareScore, order_by: [desc: score.score])
      |> Ecto.Query.limit(1)
      |> Ecto.Query.where(username: ^username)
      |> Elixirika.Repo.one()

    if record != nil, do: record.score, else: 0
  end
end
