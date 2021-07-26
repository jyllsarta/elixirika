defmodule Elixirika.TileScore do
  use Yacto.Schema, dbname: :default
  require Ecto.Query
  @derive {Jason.Encoder, only: [:score, :username, :difficulty, :remain_time]}

  schema @auto_source do
    field :seed,        :integer, default: 0,     meta: [null: false]
    field :score,       :integer, default: 0,     meta: [null: false]
    field :username,    :string,  default: "",    meta: [null: false]
    field :playlog,     :string,  default: "",    meta: [null: false, size: 15000] # TODO TEXT型にしたい
    field :difficulty,  :integer, default: 0,     meta: [null: false]
    field :remain_time, :float,   default: 0.0,   meta: [null: false]
    field :extinct,     :boolean, default: false, meta: [null: false]    
  end

  def high_score?(username, difficulty, compare_score) do
    best_record = Ecto.Query.from(score in Elixirika.TileScore, order_by: [desc: score.score])
    |> Ecto.Query.limit(1)
    |> Ecto.Query.where(username: ^username, difficulty: ^difficulty)
    |> Elixirika.Repo.one
    if best_record == nil do
      true
    else
      best_record.score < compare_score
    end
  end

  def best_time?(username, difficulty, compare_time) do
    best_record = Ecto.Query.from(score in Elixirika.TileScore, order_by: [desc: score.remain_time])
    |> Ecto.Query.limit(1)
    |> Ecto.Query.where(username: ^username, difficulty: ^difficulty, extinct: true)
    |> Elixirika.Repo.one
    if best_record == nil do
      true
    else
      best_record.remain_time < compare_time
    end
  end

  def ranking(difficulty) do
    ranking = Ecto.Query.from(score in Elixirika.TileScore, order_by: [desc: score.score])
                |> Ecto.Query.limit(1000)
                |> Ecto.Query.where(difficulty: ^difficulty)
                |> Elixirika.Repo.all
    Enum.uniq_by(ranking, &(&1.username)) |> Enum.take(10)
  end

  def time_ranking(difficulty) do
    ranking = Ecto.Query.from(score in Elixirika.TileScore, order_by: [desc: score.remain_time])
                |> Ecto.Query.limit(1000)
                |> Ecto.Query.where(difficulty: ^difficulty)
                |> Ecto.Query.where(extinct: true)
                |> Elixirika.Repo.all
    Enum.uniq_by(ranking, &(&1.username)) |> Enum.take(10)
  end

  def high_scores(username) do
    %{
      score_easy:   high_score(username, 1),
      score_normal: high_score(username, 2),
      score_hard:   high_score(username, 3),
      time_easy:    best_time(username,  1),
      time_normal:  best_time(username,  2),
      time_hard:    best_time(username,  3),
    }
  end

  defp high_score(username, difficulty) do
    record = Ecto.Query.from(score in Elixirika.TileScore, order_by: [desc: score.score])
    |> Ecto.Query.limit(1)
    |> Ecto.Query.where(username: ^username, difficulty: ^difficulty)
    |> Elixirika.Repo.one
    if(record != nil) do
      record.score
    else
      0
    end
  end
  defp best_time(username, difficulty) do
    record = Ecto.Query.from(score in Elixirika.TileScore, order_by: [desc: score.remain_time])
    |> Ecto.Query.limit(1)
    |> Ecto.Query.where(username: ^username, difficulty: ^difficulty, extinct: true)
    |> Elixirika.Repo.one
    if(record != nil) do
      record.remain_time
    else
      0
    end
  end
end
