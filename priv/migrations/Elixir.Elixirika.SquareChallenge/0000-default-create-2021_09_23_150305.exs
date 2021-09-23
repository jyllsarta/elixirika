defmodule Elixirika.SquareChallenge.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_squarechallenge")
    alter table("elixirika_squarechallenge") do
      add(:user_id, :integer, [null: false])
      add(:challenge_id, :integer, [default: 0, null: false])
      add(:chapter_id, :integer, [default: 0, null: false])
      add(:inserted_at, :naive_datetime, [])
      add(:updated_at, :naive_datetime, [])
    end
    create index("elixirika_squarechallenge", [:user_id, :challenge_id, :chapter_id], [unique: true, name: "challenge_uniqueness"])
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{challenge_id: :challenge_id, chapter_id: :chapter_id, id: :id, inserted_at: :inserted_at, updated_at: :updated_at, user_id: :user_id}, fields: [:id, :user_id, :challenge_id, :chapter_id, :inserted_at, :updated_at], meta: %{attrs: %{challenge_id: %{default: 0, null: false}, chapter_id: %{default: 0, null: false}, user_id: %{null: false}}, indices: %{{[:user_id, :challenge_id, :chapter_id], [unique: true, name: "challenge_uniqueness"]} => true}}, source: "elixirika_squarechallenge", types: %{challenge_id: :integer, chapter_id: :integer, id: :id, inserted_at: :naive_datetime, updated_at: :naive_datetime, user_id: :integer}}
  end

  def __migration__(:version) do
    0
  end
end
