declare enum LOGIN_PROVIDERS {
    KAKAO = 1000,
    GOOGLE = 1001,
}

declare const enum API_ENDPOINTS {
    AIWRITER = "http://127.0.0.1:5000",
    NODE_SERVER = "http://localhost:3000"
}

const enums = {
    LOGIN_PROVIDERS: LOGIN_PROVIDERS,
    API_ENDPOINTS: API_ENDPOINTS
}

declare global{
    var Enums: typeof enums;
}
