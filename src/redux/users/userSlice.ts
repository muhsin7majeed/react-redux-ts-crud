import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { GetUsers } from "types/user";
import { RootState } from "redux/store";
import { fetchUsers } from "services/users.service";

export interface UsersState {
  value: GetUsers;
  status: "idle" | "loading" | "failed";
}

const initialState: UsersState = {
  value: null,
  status: "idle",
};

export const getUsers = createAsyncThunk("users/fetchUsers", async (page: number) => {
  const response = await fetchUsers(page);
  return response;
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action: any) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const {} = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;
