import { AxiosInstance } from 'axios';
import createAxios from '../api';
import { AuthData } from '../../../types/Types';
import { User } from '../../../interfaces/Interfaces';

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

  getUser(user_id: number) {
    if (this.axios === undefined) {
      throw new Error('Set the Auth data');
    }

    console.log(user_id);

    return this.axios.get<Array<User>>(`user/${user_id}`);
  }
}
export default new UserDataService();
