import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import tokensReducer from './reducers/token.reducer';
// import profilesReducer from './reducer/profile.reducer';

const reducers = combineReducers({
  tokens: tokensReducer,
  // profiles: profilesReducer,
});

export const store = configureStore({
  reducer: reducers,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
