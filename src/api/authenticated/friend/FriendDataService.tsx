import { AxiosInstance } from 'axios';
import createAxios from '../api';
import { AuthData } from '../../../types/Types';
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
}
export default new FriendDataService();
