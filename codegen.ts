import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: './src/schema.graphql',
  generates: {
    './src/types.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      // pluginsキーのすぐ下に、新しいconfigプロパティを追加することができる。これは、contextTypeを指定するオブジェクトです。
      config: {
        // ! contextTypeの相対パスは、生成されるファイル（./src/types.ts）からの相対パスで指定する必要があります。
        // contextTypeの値として、./src/types.tsファイルからの相対パスで、context.tsファイルのファイルパスを渡します。context.tsファイルは同じsrcフォルダにあるので、パスは"./context "です。最後に、ファイル内で定義した型を指すように、ファイルパスの最後に#DataSourceContextを追加します。
        contextType: './context#DataSourceContext',
        // * リゾルバ関数の parent 引数として渡されるデータの種類を示すために、親の型を指定することができる。
        // - GraphQLの型をあなたのアプリケーションの内部モデルや型にマッピングするための設定です。これにより、GraphQLのスキーマとあなたのアプリケーションのコードの間でデータの一貫性を保ちやすくなります。
        //  mappersを使うことで、GraphQLの型とアプリケーションのモデルを自動的に一致させるため、手動での変換が不要になります
        mappers: {
          Playlist: './models#PlaylistModel',
          Track: './models#TrackModel',
          AddItemsToPlaylistPayload: './models#AddItemsToPlaylistPayloadModel',
        },
      },
    },
  },
};

export default config;
