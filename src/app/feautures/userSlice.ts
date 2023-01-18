import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";
import { RootState } from "../store";

interface UserSliceProps {
  user: IUser,
}

const initialState: UserSliceProps = {
  user: {
    username: '',
    email: '',
    uid: '',
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
    }
  }
})

export default userSlice.reducer;
export const {addUser, addUsername} = userSlice.actions;
export const currentUser = ((state: RootState) => state.user.user);