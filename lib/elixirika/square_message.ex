defmodule Elixirika.SquareMessage do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :user_id, :chapter_id]}

  schema @auto_source do
    field :user_id, :integer, meta: [null: false]
    field :message, :string, meta: [null: false]
    field :response, :string
  end

  def register!(user_id, message) do
    record = %__MODULE__{
      user_id: user_id,
      message: message,
    }

    Elixirika.Repo.insert!(record)
  end
end
