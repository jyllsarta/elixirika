defmodule Elixirika.SquareMessage.Migration0002 do
  use Ecto.Migration

  def change() do
    alter table("elixirika_squaremessage") do
      remove(:message)
      remove(:response)
      add(:message, :binary, [])
      add(:response, :binary, [])
    end
    :ok
  end

  def __migration__(:structure) do
    %Yacto.Migration.Structure{field_sources: %{created_at: :created_at, id: :id, message: :message, response: :response, user_id: :user_id}, fields: [:id, :user_id, :message, :response, :created_at], meta: %{attrs: %{message: %{null: false}, user_id: %{null: false}}, indices: %{{[:created_at], []} => true}}, source: "elixirika_squaremessage", types: %{created_at: :utc_datetime, id: :id, message: :binary, response: :binary, user_id: :integer}}
  end

  def __migration__(:version) do
    2
  end
end
