// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/authSlice';
import videochatReducer from "@features/video_chat/videoChatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videochat: videochatReducer
  },
});


export type AppDispatch = typeof store.dispatch