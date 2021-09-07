defmodule Elixirika.SquareUser do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:username]}

  schema @auto_source do
    # MySQL の DB index keyサイズ制限が700byte強で utf8は4バイトと考えて 128 * 4 = 512byte でギリ収まる計算
    field :username, :string, default: "", meta: [null: false, size: 128]
    index([:username], unique: true)
    timestamps()
  end

  def find_or_create_by(username) do
    user =
      Ecto.Query.from(score in Elixirika.SquareUser, where: [username: ^username])
      |> Elixirika.Repo.one()

    if user == nil do
      user = %Elixirika.SquareUser{
        username: username
      }

      new_user = Elixirika.Repo.insert!(user, on_conflict: :nothing)
      new_user.id
    else
      user.id
    end
  end

  def find_by(username) do
    user =
      Ecto.Query.from(score in Elixirika.SquareUser, where: [username: ^username])
      |> Elixirika.Repo.one()

    if user == nil do
      nil
    else
      user.id
    end
  end
end
