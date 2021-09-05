defmodule Elixirika.SquareUser.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_squareuser")
    alter table("elixirika_squareuser") do
      add(:username, :string, [default: "", null: false, size: 128])
      add(:inserted_at, :naive_datetime, [])
      add(:updated_at, :naive_datetime, [])
    end
    create index("elixirika_squareuser", [:username], [name: "username_index", unique: true])
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{id: :id, inserted_at: :inserted_at, updated_at: :updated_at, username: :username}, fields: [:id, :username, :inserted_at, :updated_at], meta: %{attrs: %{username: %{default: "", null: false, size: 128}}, indices: %{{[:username], [unique: true]} => true}}, source: "elixirika_squareuser", types: %{id: :id, inserted_at: :naive_datetime, updated_at: :naive_datetime, username: :string}}
  end

  def __migration__(:version) do
    0
  end
end
