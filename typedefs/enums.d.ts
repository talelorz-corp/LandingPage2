declare enum LOGIN_PROVIDERS {
    KAKAO = 1000,
    GOOGLE = 1001,
}

const enums = {
    LOGIN_PROVIDERS: LOGIN_PROVIDERS
}

declare global{
    var Enums: typeof enums;
}
