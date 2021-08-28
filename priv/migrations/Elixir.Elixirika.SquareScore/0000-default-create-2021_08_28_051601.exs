defmodule Elixirika.SquareScore.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_squarescore")
    alter table("elixirika_squarescore") do
      add(:score, :integer, [default: 0, null: false])
      add(:username, :string, [default: "", null: false])
      add(:playlog, :text, [])
      add(:inserted_at, :naive_datetime, [])
      add(:updated_at, :naive_datetime, [])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{id: :id, inserted_at: :inserted_at, playlog: :playlog, score: :score, updated_at: :updated_at, username: :username}, fields: [:id, :score, :username, :playlog, :inserted_at, :updated_at], meta: %{attrs: %{score: %{default: 0, null: false}, username: %{default: "", null: false}}, indices: %{}}, source: "elixirika_squarescore", types: %{id: :id, inserted_at: :naive_datetime, playlog: :text, score: :integer, updated_at: :naive_datetime, username: :string}}
  end

  def __migration__(:version) do
    0
  end
end
