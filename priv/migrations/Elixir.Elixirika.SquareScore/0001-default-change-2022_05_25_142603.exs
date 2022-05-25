defmodule Elixirika.SquareScore.Migration0001 do
  use Ecto.Migration

  def change() do
    alter table("elixirika_squarescore") do
      remove(:playlog)
      add(:play_count, :integer, [default: 1, null: false])
    end
    create index("elixirika_squarescore", [:chapter_id, :user_id, :score], [name: "chapter_id_user_id_score_index"])
    create index("elixirika_squarescore", [:user_id, :chapter_id], [name: "user_id_chapter_id_index", unique: true])
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{chapter_id: :chapter_id, id: :id, inserted_at: :inserted_at, play_count: :play_count, score: :score, updated_at: :updated_at, user_id: :user_id}, fields: [:id, :score, :chapter_id, :user_id, :play_count, :inserted_at, :updated_at], meta: %{attrs: %{chapter_id: %{default: 0, null: false}, play_count: %{default: 1, null: false}, score: %{default: 0, null: false}, user_id: %{null: false}}, indices: %{{[:chapter_id, :user_id, :score], []} => true, {[:user_id, :chapter_id], [unique: true]} => true}}, source: "elixirika_squarescore", types: %{chapter_id: :integer, id: :id, inserted_at: :naive_datetime, play_count: :integer, score: :integer, updated_at: :naive_datetime, user_id: :integer}}
  end

  def __migration__(:version) do
    1
  end
end
