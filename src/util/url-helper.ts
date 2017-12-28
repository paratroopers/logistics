import { NaContext } from './common';
/**
 * URL 管理类，管理所有2.0版本的URL
 */
export class URLHelper {
    /**
     * 初始化所有的URL，都被记录在window下
     */
    static init() {
        window["CurrentAPIDome"] = "yeeoffice.com";
        window["MerchantBaseApiUrl"] = "https://merchantBaseAPI." + window["CurrentAPIDome"];
    }
}

