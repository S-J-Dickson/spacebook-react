import axios from 'axios';
import { AuthData } from '../../types/Types';

export default function createAxios(authData: AuthData | undefined) {
  return axios.create({
    baseURL: 'http://10.0.2.2:3333/api/1.0.0/',
    headers: {
      'Content-type': 'application/json',
      'X-Authorization': authData?.token,
    },
  });
}
