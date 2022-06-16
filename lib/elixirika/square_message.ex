defmodule Elixirika.SquareMessage do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :user_id, :chapter_id]}

  schema @auto_source do
    field :user_id, :integer, meta: [null: false]
    field :message, :string, meta: [null: false]
    field :response, :string
    field :created_at, :utc_datetime
    index [:created_at]
  end

  def recent do
    # selectするオブジェクトはresponse構造体として定義していいかも
    Ecto.Query.from(
      m in __MODULE__,
      join: u in Elixirika.SquareUser,
      on: u.id == m.user_id,
      select: %{
        id: m.id,
        name: u.username,
        message: m.message,
        response: m.response,
        created_at: m.created_at
      },
      order_by: [desc: m.created_at],
      limit: 100,
    )
    |> Elixirika.Repo.all()
  end

  def register!(user_id, message) do
    record = %__MODULE__{
      user_id: user_id,
      message: message,
      created_at: DateTime.utc_now() |> DateTime.truncate(:second)
    }

    Elixirika.Repo.insert!(record)
  end

  def update!(id, response) do
    cs = Ecto.Changeset.change(
      %__MODULE__{id: id},
      %{response: response}
    )

    Elixirika.Repo.update!(cs)
  end
end
