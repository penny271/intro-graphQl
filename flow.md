# tutorial url
https://www.apollographql.com/tutorials/intro-typescript/03-schema-definition-language-sdl

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