// src/models.ts

// Represents a playlist object returned by the REST API
export type PlaylistModel = {
  id: string;
  name: string;
  description: string;
  // * tracksフィールドは、REST API から返されるプレイリストのトラックリストを表します。REST APIの構造通りに記述する
  tracks: {
    // items: {
    //   track: {
    //     id: string;
    //     name: string;
    //     duration_ms: number;
    //     explicit: boolean;
    //     uri: string;
    //   };
    // }[];
    items: {
      track: TrackModel;
    }[];
  };
};

export type TrackModel = {
  id: string;
  name: string;
  duration_ms: number;
  explicit: boolean;
  uri: string;
};

// mutation関係の型定義
// * SnapshotOrErrorの型定義をmodels.tsで行い、schema.graphqlで定義しない理由は、SnapshotOrErrorがGraphQLスキーマで直接使用されるものではなく、内部的にREST APIからのレスポンスを処理するために使われるからです。
export type SnapshotOrError = {
  snapshot_id?: string;
  error?: string;
};

export type AddItemsToPlaylistPayloadModel = {
  code: number;
  success: boolean;
  message: string;
  playlistId: string;
};
