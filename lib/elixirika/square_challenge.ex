defmodule Elixirika.SquareChallenge do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :username]}

  schema @auto_source do
    field :user_id, :integer, meta: [null: false]
    field :challenge_id, :integer, default: 0, meta: [null: false]
    field :character_id, :integer, default: 0, meta: [null: false]
    timestamps()
    index [:user_id, :challenge_id, :character_id], unique: true, name: "challenge_uniqueness"
  end

  def register!(user_id, character_id, challenge_id) do
    score = %Elixirika.SquareChallenge{
      user_id: user_id,
      character_id: character_id,
      challenge_id: challenge_id
    }

    Elixirika.Repo.insert!(score, on_conflict: :nothing)
  end
end
