# Ecto メモ

`ZxcvScore.first`

```elixir
Elixirika.ZxcvScore |> Ecto.Query.first |> Elixirika.Repo.one
```

- - -

`ZxcvScore.new(username: "mizuha", score: 100, total_score: 120, speed_score: 20)`

```elixir
%Elixirika.ZxcvScore{username: "mizuha", score: 100, total_score: 120, speed_score: 20}
```

- - -

`ZxcvScore.create(score)`

```elixir
score = %Elixirika.ZxcvScore{username: "mizuha", score: 100, total_score: 120, speed_score: 20}
Elixirika.Repo.insert(score)
```

- - -

<https://hexdocs.pm/ecto/Ecto.Query.html#order_by/3>

`ZxcvScore.order(total_score: :desc).limit(5)`

```elixir
require Ecto.Query
Ecto.Query.from(score in Elixirika.ZxcvScore, order_by: [desc: score.total_score]) |> Ecto.Query.limit(5) |> Elixirika.Repo.all
```
