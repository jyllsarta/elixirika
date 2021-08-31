defmodule Elixirika.SquareScore do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :username]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :character_id, :integer, default: 0, meta: [null: false]
    field :username, :string, default: "", meta: [null: false]
    field :playlog, :string, meta: [type: :text]
    timestamps()
  end

  def high_score(username) do
    Ecto.Query.from(score in Elixirika.SquareScore,
      order_by: [desc: score.score],
      select: %{character_id: score.character_id, score: max(score.score)},
      group_by: [score.character_id]
    )
    |> Ecto.Query.where(username: "ペクチン")
    |> Elixirika.Repo.all()
  end
end
