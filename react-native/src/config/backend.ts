

const ANDROID_ALIAS_FOR_LOCALHOST = "10.0.2.2"
const LOCAL_HOST = "127.0.0.1"
const WEBSERVER_IP = "35.162.252.208"
const HOST_IP = WEBSERVER_IP;

export const backend = {
    rest: {
        base_url : `http://${HOST_IP}:8000/api/`,
        signin_endpoint: "signin/",
        signup_endpoint: "signup/",
        validate_token_endpoint: "token/check/"
    },

    websocket: {
        base_url : `http://${HOST_IP}:8000/ws/videochatapp/`,
        reconnect_interval : 5000
        
    }

}