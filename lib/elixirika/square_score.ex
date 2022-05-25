defmodule Elixirika.SquareScore do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :user_id, :chapter_id]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :chapter_id, :integer, default: 0, meta: [null: false]
    field :user_id, :integer, meta: [null: false]
    field :play_count, :integer, default: 1, meta: [null: false]
    timestamps()

    index [:user_id, :chapter_id], unique: true
    index [:chapter_id, :user_id, :score]
  end

  def register!(user_id, chapter_id, score) do
    { prev_score, play_count } = current_score(user_id, chapter_id)

    score = %__MODULE__{
      user_id: user_id,
      chapter_id: chapter_id,
      score: Enum.max([prev_score, score]),
      play_count: play_count + 1
    }

    Elixirika.Repo.insert!(score, on_conflict: {:replace, [:play_count, :score, :updated_at]})
  end

  def high_score(user_id) do
    Ecto.Query.from(Elixirika.SquareScore) |> Ecto.Query.where(user_id: ^user_id) |> Elixirika.Repo.all()
  end

  def ranking(character_id) do
    # TODO
  end


  defp current_score(user_id, chapter_id) do
    record = Ecto.Query.from(Elixirika.SquareScore)
              |> Ecto.Query.where(user_id: ^user_id, chapter_id: ^chapter_id)
              |> Elixirika.Repo.one()
    if record do
      { record.score, record.play_count }
    else
      { 0, 1 }
    end
  end
end
