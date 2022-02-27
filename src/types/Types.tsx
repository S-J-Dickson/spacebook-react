export type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(loginUser: LoginUser): Promise<void>;
  signOut(): void;
  loginUser: LoginUser;
};

export type AuthData = {
  token: string;
  id: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type RegisterResponse = {
  user_id: number;
};

// Can go in types file
export type RootStackParams = {
  Login: undefined;
  Register: undefined;
  Photo: undefined;
  Home: undefined;
};
