import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the user state
interface UserState {
  loggedIn: boolean;
  user: {
    token: string;
    user_id: string;
    username: string;
  } | null;
  token: string | null;
}

// Initial state
const initialState: UserState = {
  loggedIn: false,
  user: null,
};

// Create a user slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Define the payload type for the login action
    login: (state, action: PayloadAction<{ token: string; user_id: string; username: string }>) => {
      const { token, user_id, username } = action.payload;
      state.loggedIn = true;
      state.user = { token, user_id, username };
    },
    logout: (state) => {
      state.loggedIn = false;
      state.user = null;
    },
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export selectors with defined return types
export const selectToken = (state: { user: UserState }) => state.user?.token;
export const selectUserId = (state: { user: UserState }) => state.user?.user_id;
export const selectUsername = (state: { user: UserState }) => state.user?.username;

// Export the reducer
export default userSlice.reducer;
