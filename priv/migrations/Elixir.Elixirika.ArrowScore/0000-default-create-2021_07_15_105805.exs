defmodule Elixirika.ArrowScore.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_arrowscore")
    alter table("elixirika_arrowscore") do
      add(:score, :integer, [default: 0, null: false])
      add(:remove_score, :integer, [default: 0, null: false])
      add(:time_score, :integer, [default: 0, null: false])
      add(:username, :string, [default: "", null: false])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{id: :id, remove_score: :remove_score, score: :score, time_score: :time_score, username: :username}, fields: [:id, :score, :remove_score, :time_score, :username], meta: %{attrs: %{remove_score: %{default: 0, null: false}, score: %{default: 0, null: false}, time_score: %{default: 0, null: false}, username: %{default: "", null: false}}, indices: %{}}, source: "elixirika_arrowscore", types: %{id: :id, remove_score: :integer, score: :integer, time_score: :integer, username: :string}}
  end

  def __migration__(:version) do
    0
  end
end
