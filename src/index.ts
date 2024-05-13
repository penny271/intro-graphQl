import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import path from 'path';
import { gql } from 'graphql-tag';
import { resolvers } from './resolvers';
import { SpotifyAPI } from './datasources/spotify-api';

const typeDefs = gql(
  // * 現在のディレクトリにあるschema.graphqlファイルを読み込み、その内容を文字列として取得する
  readFileSync(path.resolve(__dirname, './schema.graphql'), {
    encoding: 'utf-8',
  })
);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers }); // typeDefs: typeDefsのshorthand
  const { url } = await startStandaloneServer(server, {
    // * すべてのリゾルバが共有するオブジェクトを返すコンテキスト関数を定義する：
    context: async () => {
      const { cache } = server;
      // this object becomes our resolver's contextValue, the third positional argument
      return {
        // このキーの名前は任意で決めることができる
        dataSources: {
          spotifyAPI: new SpotifyAPI({ cache }),
        },
      };
    },
  });
  console.log(`
  🚀  Server is running!
  📭  Query at ${url}
`);
}

startApolloServer();
