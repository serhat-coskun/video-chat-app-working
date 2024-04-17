
import { WebSocketClient } from "@core/websocketClient";
import { Data } from 'ws';
import { backend } from "@config/backend";
import * as ws_types from "./websocketApiTypes";
import { WebSocketStatus, setWebSocketStatus } from "@features/video_chat/videoChatSlice";
import { AppDispatch } from "@app/store";

const websocket_config = backend.websocket;




/**
 * Supports 2 types of communication
 */
export class WebSocketApiService {

    private static instance: WebSocketApiService;
    private client?: WebSocketClient;
    private requestHandlers: Partial<Record<ws_types.ResultAction, ws_types.MessageHandler>> = {};
    private dispatch?: AppDispatch;

    private onOpenCallback: ()=>void | null;

    private constructor(dispatch?: AppDispatch) {

        this.dispatch = dispatch;

        const onOpen = () => {
            // Dispatch an action when the WebSocket opens
            this.onOpenCallback?.();
            this.dispatch?.(setWebSocketStatus({
                    websocketStatus: WebSocketStatus.OPENED
            }));
        }

        const onClose = (code: number, reason: string) => {
            // Dispatch an action when the WebSocket closes
            this.dispatch?.(setWebSocketStatus({
                websocketStatus: WebSocketStatus.CLOSED,
                closeReason: reason
            }));
        }

        const onError = (error: WebSocketErrorEvent) => {
            // Dispatch an action on WebSocket error
            this.dispatch?.(setWebSocketStatus({
                websocketStatus: WebSocketStatus.CLOSED,
                closeReason: error.message
            }));
        }


        this.client = new WebSocketClient(
            websocket_config.base_url,
            onOpen,
            this.handleMessage.bind(this),
            onError,
            onClose,
            backend.websocket.reconnect_interval
        );
    }


    public static getInstance(dispatch?: AppDispatch): WebSocketApiService {

        if (!WebSocketApiService.instance) {
            WebSocketApiService.instance = new WebSocketApiService(dispatch);
        }
        return WebSocketApiService.instance;
    }


    public authenticate(token: string) {
        const msg = ws_types.createAuthenticateMessage(token);
        this.sendMessage(msg);
    }

    public requestRoom(matchFoundRequestHandler: ws_types.MessageHandler) {
        const msg = ws_types.createRequestMatchMessage();
        this.registerActionHandler(ws_types.ResultAction.MATCH_FOUND, matchFoundRequestHandler)
        this.sendMessage(msg);
    }

    // Optional: Expose method to close the WebSocket connection manually
    public close(): void {
        this.client.close();
    }

    public open(): void {
        this.client.open();
    }

    private handleMessage(jsonMessage: WebSocketMessageEvent): void {
        // Attempt to parse the JSON message
        try {
            const message: ws_types.Response<ws_types.ResultAction> = JSON.parse(jsonMessage.data);
            this.requestHandlers[message.result_action](message);
            // Use for defining extra logic for specific actions
            //  switch (message.result_action) {
            //     case ws_types.ResultAction.MATCH_FOUND:
                    
            //         break;
            //     // Add cases for other result actions as needed
            //     default:
            //         console.log("Unknown result action", message.result_action);
            // }
        } catch (error) {
            console.error("Error parsing message:", error);
        }
    }
    
    public setOnOpenCallback(callback: () => void){
        this.onOpenCallback = callback;
    }

    private sendMessage(ws_types: string): void {
        this.client.sendMessage(ws_types);
    }  

    private registerActionHandler(action: ws_types.ResultAction, handler: ws_types.MessageHandler): void {
        this.requestHandlers[action] = handler;
    }




}