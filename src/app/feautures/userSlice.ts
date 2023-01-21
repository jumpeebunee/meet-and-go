import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserFull } from "../../types/types";
import { RootState } from "../store";

interface UserSliceProps {
  user: IUser,
  userContent: IUserFull,
}

const initialState: UserSliceProps = {
  user: {
    username: '',
    email: '',
    uid: '',
  },
  userContent: {
    email: '',
    interests: [],
    phone: '',
    town: '',
    uid: '',
    username: '',
    reputation: 0,
    totalMeets: 0,
    createdMeets: 0,
  }
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<IUser>) {
      const {email, uid, username} = action.payload;
      state.user = {email, uid, username};
    },
    addUsername(state, action: PayloadAction<string>) {
      state.user.username = action.payload;
    },
    addUserContent(state, action: PayloadAction<IUserFull>) {
      state.userContent = action.payload;
    }
  }
})

export default userSlice.reducer;
export const {addUser, addUsername, addUserContent} = userSlice.actions;
export const currentUser = ((state: RootState) => state.user.user);
export const currentUserContent = ((state: RootState) => state.user.userContent);