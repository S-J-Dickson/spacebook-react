import { UserLogin } from '../../interfaces/Interfaces';
import { LoginUser } from '../../types/Types';
import axios from './Api';
// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
/**
 * @author Stephen
 */
class LoginDataService {
  private axios;

  constructor() {
    this.axios = axios;
  }

  /**
   *
   * @param loginUser
   * @returns
   */
  login(loginUser: LoginUser) {
    return this.axios.post<Array<UserLogin>>('/login', loginUser);
  }
}

export default new LoginDataService();
