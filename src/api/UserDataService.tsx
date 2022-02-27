import axios from 'axios';
import http from './api';
import { UserLogin } from '../interfaces/Interfaces';
import { AuthData, LoginUser } from '../types/Types';

// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
/**
 * @author Stephen
 */
class UserDataService {
  private http;

  private axios;

  constructor() {
    this.http = http;
    this.axios = axios;
  }

  /**
   *
   * @param loginUser
   * @returns
   */
  login(loginUser: LoginUser) {
    return this.http.post<Array<UserLogin>>('/login', loginUser);
  }

  /**
   *
   * @param _authData
   * @returns
   */
  logout(_authData: AuthData) {
    return this.axios
      .create({
        baseURL: 'http://10.0.2.2:3333/api/1.0.0/',
        headers: {
          'Content-type': 'application/json',
          'X-Authorization': _authData.token,
        },
      })
      .post('logout');
  }
}

export default new UserDataService();
