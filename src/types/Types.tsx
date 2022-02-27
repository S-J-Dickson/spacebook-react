export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(loginUser: LoginUser): Promise<void>;
  signOut(): void;
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
  Setting: undefined;
  'Update Details': undefined;
};
