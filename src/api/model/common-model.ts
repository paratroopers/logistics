/* Demo Enum*/
export enum DemoEnum{
    demo = 0
}

/* Demo Interface*/
export interface DemoInterface {
    demo: any;
}

/* Demo Class*/
export class DemoClass {
    demo: any;
}

/* 公共 ====================================================================*/

/* 国际化*/
export interface AppLocaleStatic {
    antd?: Object;
    locale?: string;
    formats?: Object;
    messages?: Object;
    defaultLocale?: string;
    defaultFormats?: Object;
}