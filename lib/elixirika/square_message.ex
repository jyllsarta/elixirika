defmodule Elixirika.SquareMessage do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :user_id, :chapter_id]}

  schema @auto_source do
    field :user_id, :integer, meta: [null: false]
    field :message, :binary , meta: [null: false]
    field :response, :binary
    field :created_at, :utc_datetime
    index [:created_at]
  end

  def recent do
    # selectするオブジェクトはresponse構造体として定義していいかも
    Ecto.Query.from(
      m in __MODULE__,
      select: %{
        id: m.id,
        message: m.message,
        response: m.response,
        created_at: m.created_at
      },
      order_by: [desc: m.created_at],
      limit: 100,
    )
    |> Elixirika.Repo.all()
    |> Enum.map(& %{&1 | created_at: format_datetime(&1.created_at)})
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

  defp format_datetime(nil) do
    "6/22 00:00"
  end

  defp format_datetime(d) do
    # https://elixirschool.com/ja/lessons/basics/date_time
    # Elixir 本体にはtz データベースがなく、インポートするのもだるいのでシンプルに9時間足す
    d = DateTime.add(d, 9 * 60 * 60)
    "#{d.month}/#{d.day} #{d.hour}:#{d.minute}"
  end
end
