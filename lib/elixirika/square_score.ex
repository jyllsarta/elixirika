defmodule Elixirika.SquareScore do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :username]}

  schema @auto_source do
    field :score, :integer, default: 0, meta: [null: false]
    field :character_id, :integer, default: 0, meta: [null: false]
    field :username, :string, default: "", meta: [null: false]
    field :playlog, :string, meta: [type: :text]
    timestamps()
  end

  def high_score(username) do
    # TODO: キャラ増えるのに対して何かしらの対処をする
    pirika =
      Ecto.Query.from(score in Elixirika.SquareScore, order_by: [desc: score.score])
      |> Ecto.Query.limit(1)
      |> Ecto.Query.where(username: ^username, character_id: 1)
      |> Elixirika.Repo.one()

    mizuha =
      Ecto.Query.from(score in Elixirika.SquareScore, order_by: [desc: score.score])
      |> Ecto.Query.limit(1)
      |> Ecto.Query.where(username: ^username, character_id: 2)
      |> Elixirika.Repo.one()

    %{
      pirika: if(pirika != nil, do: pirika.score, else: 0),
      mizuha: if(mizuha != nil, do: mizuha.score, else: 0)
    }
  end
end
