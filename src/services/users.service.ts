import axios from "axios";

export function fetchUsers(page: number) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .get(`/api/users?page=${page}`)
      .then((res: any) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
