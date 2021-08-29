defmodule ElixirikaWeb.Router do
  use ElixirikaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ElixirikaWeb do
    pipe_through :browser

    # Static

    get "/", PageController, :index
    get "/index", PageController, :index
    get "/games", PageController, :games
    get "/ika", PageController, :ika
    get "/illusts", PageController, :illusts
    get "/rakugaki", PageController, :rakugaki
    get "/works", PageController, :works
    get "/twitter_webhook", PageController, :twitter_webhook
    get "/airryr_introduction", PageController, :airryr_introduction
    get "/sainokawara", PageController, :sainokawara
    get "/samusugi", PageController, :samusugi
    get "/match_illust", PageController, :match_illust

    get "/neko", PageController, :neko
    get "/nekomanual", PageController, :nekomanual
    get "/neko2", PageController, :neko2
    get "/snipon", PageController, :snipon
    get "/touzoku", PageController, :touzoku

    # Zxcv

    get "/zxcv", ZxcvController, :index
    post "/zxcv", ZxcvController, :create
    get "/zxcv/ranking", ZxcvController, :ranking
    get "/zxcv/high_score", ZxcvController, :high_score

    # Arrow

    get "/arrow", ArrowController, :index
    post "/arrow", ArrowController, :create
    get "/arrow/ranking", ArrowController, :ranking
    get "/arrow/high_score", ArrowController, :high_score

    # Tile

    get "/tile", TileController, :index
    get "/tile/new", TileController, :new
    get "/tile/howto", TileController, :howto
    get "/tile/results", TileController, :result_index
    post "/tile/results/create", TileController, :create
    get "/tile/:user_name/highscore", TileController, :high_score

    # Square
    get "/square", SquareController, :index
    post "/square/register_log", SquareController, :register_log
  end

  # Other scopes may use custom stacks.
  # scope "/api", ElixirikaWeb do
  #   pipe_through :api
  # end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser
      live_dashboard "/dashboard", metrics: ElixirikaWeb.Telemetry
    end
  end
end
