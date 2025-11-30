export interface User {
  first_name: string;
  last_name: string;
}

export interface RegisterResponse {
  user: User;
  access_token: string;
  access_expires: number;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  access_expires: number;
}

export type RegisterPayload = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export interface Category {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface TaskForm {
  title: string;
  description: string;
  date_start: Date | null;
  date_end: Date | null;
  todo_group_id: number;
}
