export interface RegisterResponse {
  user: {
    id: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}

export interface LoginResponse {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  access_token: string;
}
