import RNFetchBlob from 'rn-fetch-blob';
import createAxios from '../Api';
import { AuthData } from '../../../types/Types';
import { User, UserUpdate } from '../../../interfaces/Interfaces';
// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
/**
 * @author Stephen
 */
class UserDataService {
  private https!: AxiosInstance;

  private authData: { token: any; id?: number } | undefined;

  setAuth(authData: AuthData | undefined) {
    this.https = createAxios(authData);
    this.authData = authData;
  }

  /**
   *
   * @param _authData
   * @returns
   */
  logout() {
    return this.https.post('logout');
  }

  /**
   *
   * @param user_id
   * @returns
   */
  getUser(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.https.get<Array<User>>(`user/${user_id}`);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  getUserPhoto(user_id: number) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }
    return RNFetchBlob.fetch(
      'GET',
      `http://10.0.2.2:3333/api/1.0.0/user/${user_id}/photo`,
      {
        'X-Authorization': this.authData?.token,
      }
    );
  }

  /**
   *
   * @param user_id
   * @returns
   */
  postPhoto(user_id: number, blob, media: string) {
    return fetch(`http://10.0.2.2:3333/api/1.0.0/user/${user_id}/photo`, {
      method: 'POST',
      headers: {
        'Content-Type': media,
        'X-Authorization': this.authData?.token,
      },
      body: blob,
    });
  }

  /**
   *
   * @param user_id
   * @returns
   */
  updateUser(userUpdate: UserUpdate, user_id: number | undefined) {
    if (this.https === undefined) {
      throw new Error('Set the Auth data');
    }

    return this.https.patch<Array<User>>(`user/${user_id}`, userUpdate);
  }
}
export default new UserDataService();
