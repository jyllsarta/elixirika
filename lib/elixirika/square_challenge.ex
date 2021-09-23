defmodule Elixirika.SquareChallenge do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :challenge_id, :chapter_id]}

  schema @auto_source do
    field :user_id, :integer, meta: [null: false]
    field :challenge_id, :integer, default: 0, meta: [null: false]
    field :chapter_id, :integer, default: 0, meta: [null: false]
    timestamps()
    index([:user_id, :challenge_id, :chapter_id], unique: true, name: "challenge_uniqueness")
  end

  # NOTE: 空振ったINSERTが AUTO INCREMENT カウンターを増やすみたいな挙動をして若干気持ち悪い
  def register!(user_id, challenge_id, chapter_id) do
    challenge = %Elixirika.SquareChallenge{
      user_id: user_id,
      chapter_id: chapter_id,
      challenge_id: challenge_id,
    }

    Elixirika.Repo.insert!(challenge, on_conflict: :nothing)
  end

  def status(user_id) do
    Ecto.Query.from(record in Elixirika.SquareChallenge,
      select: %{challenge_id: record.challenge_id, chapter_id: record.chapter_id},
      where: [user_id: ^user_id]
    )
    |> Elixirika.Repo.all()
  end
end
