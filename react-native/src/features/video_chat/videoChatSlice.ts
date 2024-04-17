import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';


export enum WebSocketStatus {
    UNCONNECTED = "unconnected",
    OPENED = "opened",
    CLOSED = "closed",
}

export enum VideoChatStatus {
    CONNECTING = "connecting",
    OPENED = "opened",
    CLOSED = "closed",
}



interface VideoChatState {
    websocketStatus: WebSocketStatus;
    closeReason?: string;
    roomID?: string;
    videoChatStatus?: VideoChatStatus;

}

const initialState: VideoChatState = {
    websocketStatus : WebSocketStatus.UNCONNECTED,
};

type WebSocketStatusPayload = {
    websocketStatus: WebSocketStatus;
    closeReason?: string;
  };

  

export const videoChatSlice = createSlice({
    name: 'videochat',
    initialState,
    reducers: {
        setWebSocketStatus: (state: VideoChatState, action: PayloadAction<WebSocketStatusPayload>) => {
          state.websocketStatus = action.payload.websocketStatus;
          if (action.payload.closeReason !== undefined) {
            state.closeReason = action.payload.closeReason;
          }
        },
      },
    extraReducers(builder) {
        
    },
});


export const selectWebSocketStatus = (state: { videochat: VideoChatState }) => state.videochat.websocketStatus;
export const selectCloseReason = (state: { videochat: VideoChatState }) => state.videochat.closeReason;

export const { setWebSocketStatus } = videoChatSlice.actions;
export default videoChatSlice.reducer;



