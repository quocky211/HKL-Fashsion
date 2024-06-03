import { createSlice } from "@reduxjs/toolkit";

const credentials = createSlice({
  name: "credentials",
  initialState: {
    accessToken: null,
    level: null,
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        accessToken: action.payload["accessToken"],
        level: action.payload["level"],
      };
    },
    logout: (state, action) => {
      return {
        ...state,
        accessToken: null,
        level: null,
      };
    },
  },
});

export const credentialsReducer = credentials.reducer;
export const { login, logout } = credentials.actions;
