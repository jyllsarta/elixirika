defmodule Elixirika.SquareScore do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :user_id]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :chapter_id, :integer, default: 0, meta: [null: false]
    field :user_id, :integer, meta: [null: false]
    field :playlog, :string, meta: [type: :text]
    timestamps()
  end

  def high_score(user_id) do
    Ecto.Query.from(score in Elixirika.SquareScore,
      select: %{chapter_id: score.chapter_id, score: max(score.score)},
      group_by: [score.chapter_id]
    )
    |> Ecto.Query.where(user_id: ^user_id)
    |> Elixirika.Repo.all()
  end
end
