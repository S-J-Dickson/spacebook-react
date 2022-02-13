import http from './api';
import { UserLogin } from '../interfaces/Interfaces';

// https://www.bezkoder.com/react-typescript-axios/#Create_Data_Service
class UserDataService {
  private http;

  constructor() {
    this.http = http;
  }

  login(email: string, password: string) {
    return this.http.post<Array<UserLogin>>('/login', {
      email,
      password,
    });
  }

  logout() {
    return this.http.post<Array<UserLogin>>('/logout');
  }
}

export default new UserDataService();
