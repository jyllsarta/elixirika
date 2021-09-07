defmodule Elixirika.SquareChallenge do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :username]}

  schema @auto_source do
    field :user_id, :integer, meta: [null: false]
    field :challenge_id, :integer, default: 0, meta: [null: false]
    field :character_id, :integer, default: 0, meta: [null: false]
    timestamps()
    index([:user_id, :challenge_id, :character_id], unique: true, name: "challenge_uniqueness")
  end

  # NOTE: 空振ったINSERTが AUTO INCREMENT カウンターを増やすみたいな挙動をして若干気持ち悪い
  def register!(user_id, character_id, challenge_id) do
    score = %Elixirika.SquareChallenge{
      user_id: user_id,
      character_id: character_id,
      challenge_id: challenge_id
    }

    Elixirika.Repo.insert!(score, on_conflict: :nothing)
  end

  def status(user_id) do
    summary =
      Ecto.Query.from(record in Elixirika.SquareChallenge,
        select: %{character_id: record.character_id, challenge_id: record.challenge_id},
        where: [user_id: ^user_id]
      )
      |> Elixirika.Repo.all()

    to_id_tables(summary, %{})
  end

  #
  # [%{challenge_id: 1, character_id: 1}, %{challenge_id: 2, character_id: 1}] 
  # ↓
  # %{1 => [1, 2]}
  # 
  defp to_id_tables([record | rest], id_tables) do
    id_tables =
      if id_tables[record.character_id] do
        %{
          id_tables
          | record.character_id => id_tables[record.character_id] ++ [record.challenge_id]
        }
      else
        Map.merge(id_tables, %{record.character_id => [record.challenge_id]})
      end

    to_id_tables(rest, id_tables)
  end

  defp to_id_tables([], id_tables) do
    id_tables
  end
end
