defmodule Elixirika.ZxcvScore.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_zxcvscore")
    alter table("elixirika_zxcvscore") do
      add(:score, :integer, [default: 0, null: false])
      add(:speed_score, :integer, [default: 0, null: false])
      add(:total_score, :integer, [default: 0, null: false])
      add(:username, :string, [default: "", null: false])
      add(:inserted_at, :naive_datetime, [])
      add(:updated_at, :naive_datetime, [])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{id: :id, inserted_at: :inserted_at, score: :score, speed_score: :speed_score, total_score: :total_score, updated_at: :updated_at, username: :username}, fields: [:id, :score, :speed_score, :total_score, :username, :inserted_at, :updated_at], meta: %{attrs: %{score: %{default: 0, null: false}, speed_score: %{default: 0, null: false}, total_score: %{default: 0, null: false}, username: %{default: "", null: false}}, indices: %{}}, source: "elixirika_zxcvscore", types: %{id: :id, inserted_at: :naive_datetime, score: :integer, speed_score: :integer, total_score: :integer, updated_at: :naive_datetime, username: :string}}
  end

  def __migration__(:version) do
    0
  end
end
