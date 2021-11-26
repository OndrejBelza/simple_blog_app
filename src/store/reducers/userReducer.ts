import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import client from "../../utils/client";
import type { RootState } from "../store";

interface user {
  username: string;
}

// Define a type for the slice state
interface CounterState {
  user: user | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  user: null,
};

export const getUserData = createAsyncThunk("user/getUser", async () => {
  const response = await client.get("auth/me");
  return response.data;
});

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<user>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { clearUser, setUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
