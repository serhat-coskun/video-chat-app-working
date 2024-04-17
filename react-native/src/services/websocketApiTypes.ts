

enum RequestAction {
    REQUEST_MATCH = "join_queue",
    AUTHENTICATE = "authenticate",
    // Add other request actions as needed
}

// A helper type for messages, accommodating additional properties
export interface Message {
    action: RequestAction;
    [key: string]: any;
}

// Function for creating a login message
export function createAuthenticateMessage(token: string): string {
    const message: Message = {
        action: RequestAction.AUTHENTICATE,
        token
    };
    return JSON.stringify(message);
}

// Function for joining a room
export function createRequestMatchMessage(): string {
    const message: Message = {
        action: RequestAction.REQUEST_MATCH,
    };
    return JSON.stringify(message);
}


// Response types
export interface ErrorResponse {
    reason?: string;
    code?: number;
}

export enum ResultAction {
    MATCH_FOUND = "match_found",
    // Add other result actions as needed
}

export interface MatchFoundResult {
    room_id: string;
}

export interface ResultTypeMapping {
    MATCH_FOUND: MatchFoundResult; // Add mappings for other result actions as needed
    // OtherResultAction: OtherResultType; // Example additional mapping
}

export interface Response<T extends ResultAction> {
    id: string;
    request_action: RequestAction;
    result_action: T;
    result: T extends keyof ResultTypeMapping ? ResultTypeMapping[T] | null : null;
    error: ErrorResponse | null;
  }



 export type MessageHandler = (message: Response<any>) => void;