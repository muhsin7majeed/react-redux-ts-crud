import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { GetUsers, User } from "types/user";
import { RootState } from "redux/store";
import { fetchUsers, createUser, removeUser, patchUser } from "services/users.service";

type Status = "idle" | "loading" | "failed" | "success";

export interface UsersState {
  value: GetUsers;
  status: Status;

  createStatus: Status;
  deleteStatus: Status;
  updateStatus: Status;
}

const initialState: UsersState = {
  value: null,
  status: "idle",

  createStatus: "idle",
  deleteStatus: "idle",
  updateStatus: "idle",
};

export const getUsers = createAsyncThunk("users/fetchUsers", async (page: number) => {
  const response = await fetchUsers(page);
  return response;
});

export const addUser = createAsyncThunk("users/addUser", async (user: User) => {
  const response = await createUser(user);
  return response;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId: number) => {
  const response = await removeUser(userId);
  return response;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user: User) => {
  const response = await patchUser(user);
  return response;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetEditStatus: (state) => {
      state.updateStatus = "idle";
    },
  },

  extraReducers: (builder) => {
    builder

      /* -------------------------------------------------------------------------- */
      /*                                  GET USERS                                 */
      /* -------------------------------------------------------------------------- */

      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.status = "failed";
      })

      /* -------------------------------------------------------------------------- */
      /*                                  ADD USERS                                 */
      /* -------------------------------------------------------------------------- */

      .addCase(addUser.pending, (state) => {
        state.createStatus = "loading";
      })
      .addCase(addUser.fulfilled, (state, action: any) => {
        state.createStatus = "success";
        state.value.data = [action.payload, ...state.value.data];
        state.value.total++;
      })
      .addCase(addUser.rejected, (state) => {
        state.createStatus = "failed";
      })

      /* -------------------------------------------------------------------------- */
      /*                                DELETE USERS                                */
      /* -------------------------------------------------------------------------- */

      .addCase(deleteUser.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action: any) => {
        state.deleteStatus = "success";
        state.value.data = state.value.data.filter((u) => u.id !== action.payload);
        state.value.total--;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.deleteStatus = "failed";
      })

      /* -------------------------------------------------------------------------- */
      /*                                  EDIT USER                                 */
      /* -------------------------------------------------------------------------- */

      .addCase(updateUser.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action: any) => {
        state.updateStatus = "success";

        state.value.data.forEach((u) => {
          if (u.id === action.payload.id) {
            const { avatar, email, first_name, last_name } = action.payload;

            u.first_name = first_name;
            u.last_name = last_name;
            u.email = email;
            u.avatar = avatar;
          }
        });
      })
      .addCase(updateUser.rejected, (state) => {
        state.updateStatus = "failed";
      });
  },
});

export const { resetEditStatus } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
