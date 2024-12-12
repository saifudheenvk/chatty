import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserDocument } from '@services/utils/types/user';

export interface IUserState {
  token: string;
  profile: IUserDocument | null;
}
const initialState: IUserState = {
  token: '',
  profile: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserState>) => {
      const { token, profile } = action.payload;
      state.token = token;
      state.profile = profile;
    },
    clearUser: (state) => {
      state.token = '';
      state.profile = null;
    },
    updateUserProfile: (state, action: PayloadAction<IUserDocument>) => {
      state.profile = action.payload;
    }
  }
});

export const { addUser, clearUser, updateUserProfile } = userSlice.actions;
export default userSlice.reducer;
