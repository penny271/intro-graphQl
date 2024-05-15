// src/resolvers.ts
import { Resolvers } from './types';

export const resolvers: Resolvers = {
  // - ルートクエリリゾルバ (Root Query Resolver) は、クエリフィールドを解決するために使用されます。
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
  // * タイプリゾルバ (Type Resolver) は、特定の型に関連付けられたフィールドを解決するために使用されます。
  // Playlist: {
  //   tracks: (parent, args, contextValue, info) => {
  //     // throw new Error('Resolver not implemented');
  //     console.log('==========parent=========');
  //     console.log(parent);
  //     console.log('========== info =========');
  //     console.log(info);
  //     return null;
  //     // todo
  //   },
  // },
  // - タイプリゾルバ (Type Resolver) は、特定の型に関連付けられたフィールドを解決するために使用されます。
  // * 特別な処理が必要なフィールド（例えばtracksフィールド）には、カスタムリゾルバを定義します。
  Playlist: {
    // * Let's update our Playlist.tracks resolver to destructure the parent argument for a playlist's id as well.
    // * : 以下は getFeaturedPlaylists用
    tracks: async ({ tracks, id }, _, { dataSources }) => {
      return tracks.items ? tracks.items.map(({ track }) => track) : dataSources.spotifyAPI.getTracks(id);
    },
  },

  // - タイプリゾルバ Trackのリゾルバを追加
  // * durationMsフィールドは、Trackオブジェクト内のduration_msプロパティにマップされます。このリゾルバがない場合、durationMsフィールドは解決されず、クエリの結果がnullになる可能性があります。※ duration_ms は REST API のフィールド名であり、schemaのdurationMs は GraphQL のフィールド名であるため、整合性を取るためリゾルバを追加する必要がある
  Track: {
    durationMs: (parent) => parent.duration_ms,
  },
};
