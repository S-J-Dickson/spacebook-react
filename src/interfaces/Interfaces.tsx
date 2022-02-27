export interface UserLogin {
  user_id: number;
  session_token: string;
}

export interface UserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_repeat: string;
}

export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface UserUpdate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UserDetail {
  first_name: string;
  last_name: string;
  email: string;
  friend_count: number;
}
