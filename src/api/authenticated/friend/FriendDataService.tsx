import { AxiosInstance } from 'axios';
import { showMessage } from 'react-native-flash-message';
import createAxios from '../Api';
import { AuthData } from '../../../types/Types';
import checkNetwork from '../../../exceptions/CheckNetwork';
/**
 * @author Stephen
 */
class FriendDataService {
  private https!: AxiosInstance;

  private authData: { token: any; id?: number } | undefined;

  setAuth(authData: AuthData | undefined) {
    this.https = createAxios(authData);
    this.authData = authData;
  }

  /**
   *
   * @returns void
   */
  searchFriend(query: string) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }

    const encoded = encodeURI(query);

    return this.https.get(
      `/search?q=${encoded}&search_in=all&limit=20&offset=0`
    );
  }

  /**
   *
   * @returns
   */
  getFriendList(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.get(`/user/${user_id}/friends`);
  }

  /**
   *
   * @returns void
   */
  getFriendRequest() {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.get('/friendrequests');
  }

  /**
   *
   * @param user_id
   * @returns void
   */
  declineFriendRequest(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https
      .delete(`/friendrequests/${user_id}`)
      .then((response: any) => {
        showMessage({
          message: 'Successfully, removed friend request!',
          type: 'success',
          duration: 3000,
        });
      })
      .catch((err) => {
        checkNetwork(err.message);
        showMessage({
          message: err,
          type: 'danger',
          duration: 3000,
        });
      });
  }

  /**
   *
   * @param user_id
   * @returns void
   */
  acceptFriendRequest(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https
      .post(`/friendrequests/${user_id}`)
      .then((response: any) => {
        showMessage({
          message: 'Successfully, accepted friend request!',
          type: 'success',
          duration: 3000,
        });
      })
      .catch((err) => {
        checkNetwork(err.message);

        showMessage({
          message: 'Error contact the helpdesk!',
          type: 'danger',
          duration: 3000,
        });
      });
  }

  /**
   *
   * @param user_id
   * @returns void
   */
  sendFriendRequest(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https
      .post(`/user/${user_id}/friends`)
      .then((response: any) => {
        showMessage({
          message: 'Successfully, sent friend request!',
          type: 'success',
          duration: 3000,
        });
      })
      .catch((err) => {
        checkNetwork(err.message);
        showMessage({
          message: 'Friend request already sent to user!',
          type: 'warning',
          duration: 3000,
        });
      });
  }
}
export default new FriendDataService();
