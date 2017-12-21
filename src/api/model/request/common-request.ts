export interface DemoRequest {
    demo: string;
}

/** 获取验证码*/
export interface GetCodeRequest {
    tel?: string;
    mail?: string;
    type?: string;
    tenantID?: string;
}