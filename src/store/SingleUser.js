import { createSlice } from "@reduxjs/toolkit";
export const UserSlice = createSlice({
  name: "User",
  initialState: {
    data: { isAdmin: false },
    loading: false,
    error: {},
  },
  reducers: {
    updateUser(s, a) {
      s.data = { ...a.payload.data };
      s.loading = a.payload.loading;
      s.error = { ...a.payload.error };
    },
  },
});
export const UserActions = UserSlice.actions;

export const userThunk = (data, loading, error) => {
  return async (dispatch) => {
    dispatch(UserActions.updateUser(data, loading, error));
  };
};
