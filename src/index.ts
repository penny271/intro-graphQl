import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";
import path from "path";
import { gql } from "graphql-tag";

const typeDefs = gql(
  // * 現在のディレクトリにあるschema.graphqlファイルを読み込み、その内容を文字列として取得する
  readFileSync(path.resolve(__dirname, "./schema.graphql"), {
    encoding: "utf-8",
  })
);

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs }); // typeDefs: typeDefsのshorthand
  const { url } = await startStandaloneServer(server);
  console.log(`
  🚀  Server is running!
  📭  Query at ${url}
`);
}

startApolloServer();
