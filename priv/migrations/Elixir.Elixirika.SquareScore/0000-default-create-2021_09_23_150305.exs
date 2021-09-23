defmodule Elixirika.SquareScore.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_squarescore")
    alter table("elixirika_squarescore") do
      add(:score, :integer, [default: 0, null: false])
      add(:chapter_id, :integer, [default: 0, null: false])
      add(:user_id, :integer, [null: false])
      add(:playlog, :text, [])
      add(:inserted_at, :naive_datetime, [])
      add(:updated_at, :naive_datetime, [])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{chapter_id: :chapter_id, id: :id, inserted_at: :inserted_at, playlog: :playlog, score: :score, updated_at: :updated_at, user_id: :user_id}, fields: [:id, :score, :chapter_id, :user_id, :playlog, :inserted_at, :updated_at], meta: %{attrs: %{chapter_id: %{default: 0, null: false}, score: %{default: 0, null: false}, user_id: %{null: false}}, indices: %{}}, source: "elixirika_squarescore", types: %{chapter_id: :integer, id: :id, inserted_at: :naive_datetime, playlog: :text, score: :integer, updated_at: :naive_datetime, user_id: :integer}}
  end

  def __migration__(:version) do
    0
  end
end
