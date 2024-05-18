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

  Mutation: {
    // addItemsToPlaylist: (parent, args, contextValue, info) => {
    addItemsToPlaylist: async (parent, { input }, { dataSources }) => {
      // addItemsToPlaylist: async (_, { input }, { dataSources }) => {
      try {
        const response = await dataSources.spotifyAPI.addItemsToPlaylist(input);
        console.log('response:::', response);
        // console.log('parent ::: undefined', parent);
        // [0] response::: { snapshot_id: '6LB6g7S5nc1uVVfj00Kh6Z' }
        if (response.snapshot_id) {
          // everything succeeds with the mutation
          return {
            code: 200,
            success: true,
            message: 'Tracks added to playlist!!',
            // playlist: null,
            playlistId: response.snapshot_id,
          };
        } else {
          throw Error('snapshot_id property not found');
        }
      } catch (err) {
        // something went wrong with the mutation
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err}`,
          // playlist: null,
          playlistId: null,
        };
      }
    },
  },

  // * この関数を定義することで、Mutation.addItemsToPlaylistリゾルバが、それが返すAddItemsToPlaylistPayloadオブジェクト上のプレイリストフィールドを解決する責任はもはやないことをサーバに伝えている
  AddItemsToPlaylistPayload: {
    // playlist: (parent, args, contextValue, info)
    // * playlisの中のplaylistIdを使用する
    playlist: ({ playlistId }, _, { dataSources }) => {
      // console.log('parent:::', parent);
      return dataSources.spotifyAPI.getPlaylist(playlistId);
    },
  },
};
