import axios from "axios";
import { User } from "types/user";

export function fetchUsers(page: number) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .get(`/api/users?page=${page}`)
      .then((res: any) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function createUser(user: User) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post("/api/users", user)
      .then((res: any) => resolve(res.data))
      .catch((err) => reject(err));
  });
}

export function removeUser(userId: number) {
  return new Promise<number>((resolve, reject) => {
    axios
      .post(`/api/users/${userId}`)
      .then(() => resolve(userId))
      .catch((err) => reject(err));
  });
}

export function patchUser(user: User) {
  return new Promise<{ data: any }>((resolve, reject) => {
    axios
      .post(`/api/users/${user.id}`, user)
      .then((res: any) => resolve(res.data))
      .catch((err) => reject(err));
  });
}
