// * This is where we'll define the type that describes the context we pass to our server.
import { SpotifyAPI } from "./datasources/spotify-api";

// ! 2024/05/12 なぜこう書けるかわからない 型のvalueにクラスを入れている? なぜ可能??
export type DataSourceContext = {
  dataSources: {
    spotifyAPI: SpotifyAPI;
  };
};
