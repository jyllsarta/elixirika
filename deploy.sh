#!/bin/zsh -xe

echo "##### checkout latest"

#git reset --hard
#git clean -f
git pull

echo "##### resolve deps"

mix deps.get --only prod
MIX_ENV=prod mix compile

npm install --prefix ./assets
npm run deploy --prefix ./assets
mix phx.digest

echo "##### create release"

MIX_ENV=prod mix release

echo "##### (skip) DB migration"

#_build/prod/rel/my_app/bin/my_app eval "MyApp.Release.migrate"

echo "##### start server daemon"

_build/prod/rel/elixirika/bin/elixirika restart
