import { getUserSuggestions } from "@redux/api/suggestion";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserDocument } from "@services/utils/types/user";

export interface ISuggestionsState {
  users: IUserDocument[];
  isLoading: boolean;
}

const initialState = {
  users: [],
  isLoading: false
};


const suggestionsSlice = createSlice({
  name: 'suggestions',
  initialState,
  reducers: {
    addToSuggestions: (state: ISuggestionsState, action: PayloadAction<ISuggestionsState>) => {
      const { isLoading, users } = action.payload;
      state.users = [...users];
      state.isLoading = isLoading;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getUserSuggestions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserSuggestions.fulfilled, (state: ISuggestionsState, action) => {
      state.isLoading = false;
      const { users } = action.payload;
      state.users = [...users];
    });
    builder.addCase(getUserSuggestions.rejected, (state) => {
      state.isLoading = false;
    });
  }
});

export const { addToSuggestions } = suggestionsSlice.actions;
export default suggestionsSlice.reducer;
