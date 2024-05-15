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
