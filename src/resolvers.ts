import { Resolvers } from "./types";
import { Playlist } from "../types";

export const resolvers: Resolvers = {
  Query: {
    // ! リゾルバは、データを入力するフィールドと同じ名前でなければなりません。
    // featuredPlaylists: (parent, args, contextValue, info) => {},
    featuredPlaylists: (_, __, { dataSources }) => {
      return dataSources.spotifyAPI.getFeaturedPlaylists();
    },
  },
};
