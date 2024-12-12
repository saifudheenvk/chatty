import { configureStore } from "@reduxjs/toolkit";
import userReducer from '@redux/reducers/user/user.reducer';
import suggestionReducer from '@redux/reducers/suggestions/suggestion.reducer';
import notificationReducer from '@redux/reducers/notifications/notifications.reducer';


export const store = configureStore({
  reducer: {
    user: userReducer,
    suggestions: suggestionReducer,
    notifications: notificationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
