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
      },
    },
  },
};

export default config;
