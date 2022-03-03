import { UserDetail } from '../interfaces/Interfaces';

export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(loginUser: LoginUser): Promise<void>;
  signOut(): void;
  user: UserDetail;
};

export type User = {
  first_name: string;
  last_name: string;
  email: string;
};

export type AuthData = {
  token: string;
  id: number;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  user_id: number;
};

export type RootStackParams = {
  Login: undefined;
  Register: undefined;
};

export type SettingStackParams = {
  Settings: undefined;
  'Update Details': undefined;
  Photo: undefined;
};

export type PostStackParams = {
  Post: undefined;
  'Home Feed': undefined;
};
