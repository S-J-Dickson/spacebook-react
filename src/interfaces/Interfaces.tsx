export interface UserLogin {
  user_id: number;
  session_token: string;
}

export interface UserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
