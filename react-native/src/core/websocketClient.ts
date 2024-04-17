import { backend } from "@config/index";
import MessageEvent, { MessageEventData } from "react-native-webrtc/lib/typescript/MessageEvent";



export class WebSocketClient {
    private ws: WebSocket | null = null;
    private url: string;

    private onOpenCallback: () => void;
    private onMessageCallback: (msg: WebSocketMessageEvent) => void;
    private onErrorCallback: (error: WebSocketErrorEvent) => void;
    private onCloseCallback: (event: WebSocketCloseEvent) => void;
    private shouldReconnect: boolean = true;
    private reconnectInterval: number = backend.websocket.reconnect_interval;

    constructor(url: string, onOpen?: () => void, onMessage?: (msg: WebSocketMessageEvent) => void, onError?: (error: WebSocketErrorEvent) => void, onClose?: (code: number, reason: string) => void, reconnectInterval?: number) {
        this.url = url;
        this.reconnectInterval = reconnectInterval || this.reconnectInterval;


        
        // Assign custom callbacks or default ones
        this.onOpenCallback = onOpen || this.defaultOnOpen.bind(this);
        this.onMessageCallback = onMessage || this.defaultOnMessage.bind(this);
        this.onErrorCallback = onError || this.defaultOnError.bind(this);
        this.onCloseCallback = (event: WebSocketCloseEvent)  => {
            if (onClose) {
                onClose(event.code, event.reason);
            }
            if (this.shouldReconnect) {
                setTimeout(() => this.connect(), this.reconnectInterval);
            }
        };

        this.connect();
    }

    private connect(): void {
        this.ws = new WebSocket(this.url);

        this.ws.onopen = this.onOpenCallback;
        this.ws.onmessage = this.onMessageCallback;
        this.ws.onerror = this.onErrorCallback;
        this.ws.onclose = this.onCloseCallback;
    }

    private defaultOnOpen(): void {
        console.log('WebSocket connection established');
    }

    private defaultOnMessage(msg: WebSocketMessageEvent): void {
        console.log('Message from server:', msg.data.toString());
    }

    private defaultOnError(error: WebSocketErrorEvent): void {
        console.error('WebSocket error:', error.message);
    }

    public sendMessage(message: string): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.log('WebSocket is not open. Message not sent:', message);
        }
    }

    public open(): void {
        this.close(); // try close the old one
        this.connect();
        console.log("Opened websocket connection.")
    }

    public close(): void {
        if (this.ws) {
            this.shouldReconnect = false; // Prevents reconnecting after calling close
            this.ws.close();
            console.log("Closed websocket connection.");
            
        }
    }
}

