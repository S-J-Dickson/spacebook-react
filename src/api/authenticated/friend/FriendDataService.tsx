import { AxiosInstance } from 'axios';
import { showMessage } from 'react-native-flash-message';
import createAxios from '../api';
import { AuthData } from '../../../types/Types';
import checkNetwork from '../../../exceptions/CheckNetwork';
/**
 * @author Stephen
 */
class FriendDataService {
  private https!: AxiosInstance;

  private authData: { token: any; id?: number } | undefined;

  setAuth(authData: AuthData) {
    this.https = createAxios(authData);
    this.authData = authData;
  }

  /**
   *
   * @returns
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
   * @returns
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

        console.log(err);

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
   * @returns
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
}
export default new FriendDataService();
