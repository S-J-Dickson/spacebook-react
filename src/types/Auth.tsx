type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  signIn(loginUser: LoginUser): Promise<void>;
  signOut(): void;
  loginUser: LoginUser;
};

type AuthData = {
  token: string;
  id: string;
};

type LoginUser = {
  email: string;
  password: string;
};
