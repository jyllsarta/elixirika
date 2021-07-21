defmodule Elixirika.TileScore.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_tilescore")
    alter table("elixirika_tilescore") do
      add(:seed, :integer, [default: 0, null: false])
      add(:score, :integer, [default: 0, null: false])
      add(:username, :string, [default: "", null: false])
      add(:playlog, :string, [default: "", null: false, size: 15000])
      add(:difficulty, :integer, [default: 0, null: false])
      add(:remain_time, :integer, [default: 0, null: false])
      add(:extinct, :boolean, [default: false, null: false])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{difficulty: :difficulty, extinct: :extinct, id: :id, playlog: :playlog, remain_time: :remain_time, score: :score, seed: :seed, username: :username}, fields: [:id, :seed, :score, :username, :playlog, :difficulty, :remain_time, :extinct], meta: %{attrs: %{difficulty: %{default: 0, null: false}, extinct: %{default: false, null: false}, playlog: %{default: "", null: false, size: 15000}, remain_time: %{default: 0, null: false}, score: %{default: 0, null: false}, seed: %{default: 0, null: false}, username: %{default: "", null: false}}, indices: %{}}, source: "elixirika_tilescore", types: %{difficulty: :integer, extinct: :boolean, id: :id, playlog: :string, remain_time: :integer, score: :integer, seed: :integer, username: :string}}
  end

  def __migration__(:version) do
    0
  end
end
