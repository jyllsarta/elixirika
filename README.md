# Elixirika

さーたはうす のwebサイトです

# 環境構築

## ツールのインストール

.tool-versions にあるものをインストールしてください。asdf があるときっとはやい
歴史的な理由でtool-versions にはありませんが ruby も必要です。 3.0.0 で動作確認していますが、どれでもきっと動きます。

## MySQLのインストール

localhost:3306 に MySQL 5.7 が立っている状態にしてください。

## 依存のインストール

```
mix deps.get
mix compile
```

## 環境変数のセット

direnv が便利ですが、下記のものが適切にセットされていれば特にツールの指定はありません

```
mv .env.example .env
vim .env # DBの接続情報を入力
```

## DBのセットアップ

```
mix ecto.create
mix yacto.migrate
```

## アセットのリンク

画像や直接配信しているCSSなどの静的ファイルは別リポジトリ https://github.com/jyllsarta/elixirika_assets に格納されています。
直接参照できるように、シンボリックリンクを張ります。
以下はelixirika, elixirika_masterdata ともにホームディレクトリにある前提のサンプルです。

```
cd ~
git clone git@github.com:jyllsarta/elixirika_assets.git
cd ~/elixirika/assets/
ln -s ~/elixirika_assets/static static
```

## (Square ゲーム用) マスターデータのリンク

Square というゲームが https://github.com/jyllsarta/elixirika_masterdata を利用しています。
マスターデータのディレクトリを参照できるようにシンボリックリンクを張ります。
以下はelixirika, elixirika_masterdata ともにホームディレクトリにある前提のサンプルです。

```
cd ~
git clone git@github.com:jyllsarta/elixirika_masterdata.git
cd ~/elixirika/assets/js/pirika_js/square
ln -s ~/elixirika_masterdata/js masterdata
```

## アセットの構築

```
cd ~/elixirika/assets
npm install
```

これで環境構築は完了です。

# サーバ起動

```
./local_server.sh
```

localhost:4000 にサーバが立ちます。  `PORT=4001 ./local_server.sh` で起動ポートを変更できます。
