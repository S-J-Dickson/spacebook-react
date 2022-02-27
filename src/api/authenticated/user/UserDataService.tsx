import { AxiosInstance } from 'axios';
import createAxios from '../api';
import { AuthData } from '../../../types/Types';

// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
/**
 * @author Stephen
 */
class UserDataService {
  private axios: AxiosInstance | undefined;

  setAuth(authData: AuthData | undefined) {
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
}
export default new UserDataService();
