defmodule Elixirika.TileScore.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_tilescore")
    alter table("elixirika_tilescore") do
      add(:seed, :integer, [default: 0, null: false])
      add(:score, :integer, [default: 0, null: false])
      add(:username, :string, [default: "", null: false])
      add(:playlog, :text, [])
      add(:difficulty, :integer, [default: 0, null: false])
      add(:remain_time, :float, [default: 0.0, null: false])
      add(:extinct, :boolean, [default: false, null: false])
      add(:inserted_at, :naive_datetime, [])
      add(:updated_at, :naive_datetime, [])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{difficulty: :difficulty, extinct: :extinct, id: :id, inserted_at: :inserted_at, playlog: :playlog, remain_time: :remain_time, score: :score, seed: :seed, updated_at: :updated_at, username: :username}, fields: [:id, :seed, :score, :username, :playlog, :difficulty, :remain_time, :extinct, :inserted_at, :updated_at], meta: %{attrs: %{difficulty: %{default: 0, null: false}, extinct: %{default: false, null: false}, remain_time: %{default: 0.0, null: false}, score: %{default: 0, null: false}, seed: %{default: 0, null: false}, username: %{default: "", null: false}}, indices: %{}}, source: "elixirika_tilescore", types: %{difficulty: :integer, extinct: :boolean, id: :id, inserted_at: :naive_datetime, playlog: :text, remain_time: :float, score: :integer, seed: :integer, updated_at: :naive_datetime, username: :string}}
  end

  def __migration__(:version) do
    0
  end
end
