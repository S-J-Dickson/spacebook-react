import { AxiosInstance } from 'axios';
import createAxios from '../api';
import { AuthData } from '../../../types/Types';
import { User, UserUpdate } from '../../../interfaces/Interfaces';

// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
/**
 * @author Stephen
 */
class UserDataService {
  private axios!: AxiosInstance;

  setAuth(authData: AuthData) {
    this.axios = createAxios(authData);
  }

  /**
   *
   * @param _authData
   * @returns
   */
  logout() {
    return this.axios.post('logout');
  }

  /**
   *
   * @param user_id
   * @returns
   */
  getUser(user_id: number) {
    if (this.axios === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.axios.get<Array<User>>(`user/${user_id}`);
  }

  /**
   *
   * @param user_id
   * @returns
   */
  updateUser(userUpdate: UserUpdate, user_id: number) {
    if (this.axios === undefined) {
      throw new Error('Set the Auth data');
    }
    return this.axios.patch<Array<User>>(`user/${user_id}`, userUpdate);
  }
}
export default new UserDataService();
