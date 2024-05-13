// src/resolvers.ts
import { Resolvers } from './types';
import { Playlist } from './types'; // Import the missing module or type declaration.

export const resolvers: Resolvers = {
  Query: {
    // ! リゾルバは、src/schema.graphqlで定義しているデータを入力するフィールドと同じ名前でなければなりません。
    // featuredPlaylists: (parent, args, contextValue, info) => {},
    featuredPlaylists: (_, __, { dataSources }) => {
      // * src/datasources/spotify-api.ts でgetFeaturedPlaylistsを取得
      return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
    playlist: (_, { id }, { dataSources }) => {
      return dataSources.spotifyAPI.getPlaylist(id);
    },
  },
  Playlist: {
    tracks: (parent, args, contextValue, info) => {
      console.log('==========parent=========');
      console.log(parent);
      console.log('========== info =========');
      console.log(info);
      return null;
      // todo
    },
  },
};
