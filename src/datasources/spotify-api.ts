// @apollo/datasource-rest パッケージから RESTDataSource クラスをインポートします。
import { RESTDataSource } from '@apollo/datasource-rest';
// ! REST APIレスポンスの形状から、プレイリストとトラックGraphQLタイプの両方が、これらのエンドポイントから得られるレスポンスの形状を実際には記述していないため mapperを使用
// import { Playlist } from '../types';
// import { Track } from '../types';

// ! REST APIレスポンスの形状を正確に記述した型をインポート
import { PlaylistModel, TrackModel, SnapshotOrError } from '../models';

export class SpotifyAPI extends RESTDataSource {
  baseURL = 'https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/';

  // プレイリストデータを返す REST API エンドポイントにアクセスできるメソッドをクラスに与える必要があります。
  // async getFeaturedPlaylists(): Promise<Playlist[]> {
  async getFeaturedPlaylists(): Promise<PlaylistModel[]> {
    // RESTDataSource クラスは、HTTP リクエスト用のヘルパーメソッドを提供します。この例では、 browse/featured-playlists エンドポイントに対して GET リクエストを行います。
    // const response = await this.get<{ playlists: { items: Playlist[] } }>('browse/featured-playlists');
    const response = await this.get<{ playlists: { items: PlaylistModel[] } }>('browse/featured-playlists');
    return response?.playlists?.items ?? [];
  }

  // getPlaylist(playlistId: string): Promise<Playlist> {
  getPlaylist(playlistId: string): Promise<PlaylistModel> {
    return this.get(`playlists/${playlistId}`);
  }

  // * featuredPlaylists用のリゾルバを作成 - APIから返されるtracksの構造がgetFeaturedPlaylists　と getPlaylist と違うため、それに対応するために新たに作成
  // async getTracks(playlistId: string): Promise<Track[]> {
  async getTracks(playlistId: string): Promise<TrackModel[]> {
    // const response = await this.get<{ items: { track: Track }[] }>(`playlists/${playlistId}/tracks`);
    const response = await this.get<{ items: { track: TrackModel }[] }>(`playlists/${playlistId}/tracks`);
    return response?.items?.map(({ track }) => track) ?? [];
  }

  // mutation関係
  // * SnapshotOrErrorの型定義をmodels.tsで行い、schema.graphqlで定義しない理由は、SnapshotOrErrorがGraphQLスキーマで直接使用されるものではなく、内部的にREST APIからのレスポンスを処理するために使われるからです。
  addItemsToPlaylist(input: { playlistId: string; uris: string[] }): Promise<SnapshotOrError> {
    const { playlistId, uris } = input;
    return this.post(`playlists/${playlistId}/tracks`, {
      params: {
        uris: uris.join(','), // プレイリストに追加するトラックのURIをカンマ区切りの文字列に変換
      },
    });
  }
}
