defmodule Elixirika.SquareMessage.Migration0000 do
  use Ecto.Migration

  def change() do
    create table("elixirika_squaremessage")
    alter table("elixirika_squaremessage") do
      add(:user_id, :integer, [null: false])
      add(:message, :string, [null: false])
      add(:response, :string, [])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{id: :id, message: :message, response: :response, user_id: :user_id}, fields: [:id, :user_id, :message, :response], meta: %{attrs: %{message: %{null: false}, user_id: %{null: false}}, indices: %{}}, source: "elixirika_squaremessage", types: %{id: :id, message: :string, response: :string, user_id: :integer}}
  end

  def __migration__(:version) do
    0
  end
end
