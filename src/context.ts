// * This is where we'll define the type that describes the context we pass to our server.
import { SpotifyAPI } from './datasources/spotify-api';

export type DataSourceContext = {
  dataSources: {
    // クラスはそのまま型定義として使用できる class自体が型のようなものだから
    spotifyAPI: SpotifyAPI;
  };
};
