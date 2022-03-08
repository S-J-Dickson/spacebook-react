import { AxiosInstance } from 'axios';
import createAxios from '../Api';
import { AuthData } from '../../../types/Types';
import { PostRequest } from '../../../interfaces/Interfaces';
// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
/**
 * @author Stephen
 */
class PostDataService {
  private https!: AxiosInstance;

  private authData: { token: any; id?: number } | undefined;

  setAuth(authData: AuthData | undefined) {
    this.https = createAxios(authData);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  index(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.get(`user/${user_id}/post`);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  store(user_id: number, post: PostRequest) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.post(`user/${user_id}/post`, post);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  show(user_id: number, post_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.get(`user/${user_id}/post/${post_id}`);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  delete(user_id: number, post_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.delete(`user/${user_id}/post/${post_id}`);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  update(user_id: number, post_id: number, post: PostRequest) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.patch(`user/${user_id}/post/${post_id}`, post);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  like(user_id: number, post_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.post(`user/${user_id}/post/${post_id}/like`);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  unLike(user_id: number, post_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.delete(`user/${user_id}/post/${post_id}/like`);
  }
}
export default new PostDataService();
