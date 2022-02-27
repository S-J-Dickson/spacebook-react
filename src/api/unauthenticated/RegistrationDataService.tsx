import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import http from './api';
import { UserRequest } from '../../interfaces/Interfaces';
import checkNetwork from '../../exceptions/CheckNetwork';
import { RegisterResponse, RootStackParams } from '../../types/Types';

type LoginScreenProp = StackNavigationProp<RootStackParams, 'Login'>;

class RegistrationDataService {
  private http;

  constructor() {
    this.http = http;
  }

  /**
   *
   * @param userRequest
   */
  async createAccount(userRequest: UserRequest, navigation: LoginScreenProp) {
    try {
      await this.http.post<Array<RegisterResponse>>('/user', userRequest);
      showMessage({
        message: 'You have successfully created an account!',
        type: 'success',
        duration: 3000,
      });

      navigation.navigate('Login');
    } catch (err: any) {
      checkNetwork(err.message);

      if (err.response.status === 400) {
        showMessage({
          message: 'This account already exists!',
          type: 'danger',
          duration: 3000,
        });
      }
    }
  }
}

export default new RegistrationDataService();
