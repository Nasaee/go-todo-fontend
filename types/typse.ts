export interface RegisterResponse {
  user: {
    id: string;
    created_at: string;
    updated_at: string;
  };
  access_token: string;
}
