# tutorial url
https://www.apollographql.com/tutorials/intro-typescript/03-schema-definition-language-sdl

# playlist_id: 6Fl8d6KF0O4V5kFdbzalfW

# 3
Let's navigate to the src directory. In there, we're going to create a new file called schema.graphql.

# 4
`npm install @apollo/server graphql graphql-tag`

# 6
`spotify api doc: https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/docs/`

データソースの設定
データがどこにあり、どのような構造になっているかは理解できた。素晴らしい。あとは、そのデータをすべてリクエストする方法が必要です！

GraphQL APIを構築する際、RESTからデータを取得するのは非常に一般的な作業であるため、Apollo Serverはそのための専用のDataSourceクラス、RESTDataSourceを提供しています。
`npm install @apollo/datasource-rest`

# 8 codegen
`npm install -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers`

`npm run generate`

# 9 QUERYING REAL DATA
contextType に型を定義する
`npm run generate`

# 10 QUERY ARGUMENTS
> スキーマの新しいプレイリストフィールドを考慮するために生成された型を更新する必要がありますが、スキーマが変更されるたびに自動的に型を再生成するようにプロジェクトを更新しましょう。
> package.jsonに飛びます。devスクリプトとgenerateスクリプトを微調整します。

`"dev": "concurrently \"ts-node-dev --respawn --watch ./**/*.graphql ./src/index.ts\" \"npm run generate --watch\"",`

> このアップデートにより、2つのスクリプトを同時に実行できるようになった。1つ目は、以前使用したts-node-devだ。このコマンドは、プロジェクトに変更が加えられるたびに、index.tsからアプリを再起動する。2つ目のスクリプトはnpm run generateで、--watchフラグを付けて実行する。

> 次に、generateスクリプトを更新しよう。

> package.json

`"generate"： "graphql-codegen --watch \"src/schema.graphql""`
> この追加により、GraphQL Code Generatorにsrc/schema.graphqlファイルを監視するよう明示的に指示し、codegenプロセスを再実行することができる。その結果、プロジェクトが変更されるたびに、スキーマが変更されるたびに更新されたtypes.tsファイルとともに、これまでと同じホットリロードを得ることができる！

watcherをインストール
`npm install @parcel/watcher`

> さっそく試してみよう。以下のコマンドでサーバーを再起動してください：

`npm run dev`

