import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import http from './api';
import { UserRequest } from '../interfaces/Interfaces';
import checkNetwork from '../exceptions/CheckNetwork';
import { RegisterResponse, RootStackParams } from '../types/Types';

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
  createAccount(userRequest: UserRequest, navigation: LoginScreenProp) {
    return this.http
      .post<Array<RegisterResponse>>('/user', userRequest)
      .then(() => {
        showMessage({
          message: 'You have successfully created an account!',
          type: 'danger',
          duration: 3000,
        });

        navigation.navigate('Login');
      })
      .catch((error) => {
        checkNetwork(error.message);

        if (error.response.status === 400) {
          showMessage({
            message: 'This account already exists!',
            type: 'danger',
            duration: 3000,
          });
        }
      });
  }
}

export default new RegistrationDataService();
