#!/bin/zsh -xe

echo "##### checkout latest"

#git reset --hard
#git clean -f
git pull

echo "##### pull masterdata"

(cd ~/elixirika_masterdata; git pull)

echo "##### pull asset"

(cd ~/elixirika_assets; git pull)

echo "##### resolve deps"

mix deps.get --only prod
MIX_ENV=prod mix compile

#npm install --prefix ./assets
npm run deploy --prefix ./assets
#mix phx.digest

echo "##### create release"

MIX_ENV=prod mix release --overwrite

echo "##### DB migration"

mix yacto.migrate

echo "##### start server daemon"
echo "##### if first time, try _build/prod/rel/elixirika/bin/elixirika daemon"

_build/prod/rel/elixirika/bin/elixirika restart

