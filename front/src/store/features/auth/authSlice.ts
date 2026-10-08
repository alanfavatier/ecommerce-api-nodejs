import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser } from "@/lib/types";

interface AuthState {
  user: AuthUser | null;
  hydrated: boolean;
}

const initialState: AuthState = {
  user: null,
  hydrated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthUser | null>) {
      state.user = action.payload;
      state.hydrated = true;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
