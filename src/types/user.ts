export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string | any;
}

export interface GetUsers {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}
