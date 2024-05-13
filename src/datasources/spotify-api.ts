// @apollo/datasource-rest パッケージから RESTDataSource クラスをインポートします。
import { RESTDataSource } from '@apollo/datasource-rest';
import { Playlist } from '../types';

export class SpotifyAPI extends RESTDataSource {
  baseURL = 'https://spotify-demo-api-fe224840a08c.herokuapp.com/v1/';

  // プレイリストデータを返す REST API エンドポイントにアクセスできるメソッドをクラスに与える必要があります。
  async getFeaturedPlaylists(): Promise<Playlist[]> {
    // RESTDataSource クラスは、HTTP リクエスト用のヘルパーメソッドを提供します。この例では、 browse/featured-playlists エンドポイントに対して GET リクエストを行います。
    const response = await this.get<{ playlists: { items: Playlist[] } }>('browse/featured-playlists');
    return response?.playlists?.items ?? [];
  }

  getPlaylist(playlistId: string): Promise<Playlist> {
    return this.get(`playlists/${playlistId}`);
  }
}
