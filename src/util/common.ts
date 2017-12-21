import {SagaMiddleware} from "redux-saga";
import {Cookies} from "cookie";
import {Store} from "redux";

export interface NaBase {
}

export interface NaRequest extends NaBase {
}

export interface NaResponse extends NaBase {
    /**
     * 数据
     *
     * @type {任意类型}
     * @memberOf NaResponse
     */
    Data?: any;
    /**
     * 状态
     */
    Status?: number;
    /**
     * 消息
     */
    Message?: string;
    /**
     * 总记录数
     */
    TotalCount?: number;
}

export interface NaRequestParam<T> {
    /**
     * URL 请求访问的路径
     *
     * @type {string}
     * @memberOf RequestParam
     */
    Url?: string;
    /**
     * 是否需要Token
     */
    RequireToken?: boolean;
    /**
     * 头信息
     */
    Headers?: {
        [key: string]: string
    }[];
    /**
     * 请求的数据
     *
     * @type {WObject}
     * @memberOf RequestParam
     */
    Data?: T;
    /**
     * 查询参数
     *
     * @type {WObject}
     * @memberOf RequestParam
     */
    Querys?: NaBase;
    /**
     * 访问接口前缀
     *
     * @type {string}
     * @memberOf RequestParam
     */
    Prefix?: string;
    /**
     * 是否需要错误消息
     */
    IgnoreError?: boolean;
    /**
     * FormData
     */
    FormData?: FormData;
}

export class NaGlobal {
    static store: Store<any>;
    static intl: ReactIntl.InjectedIntl;
    static saga: SagaMiddleware;
    static user: SagaMiddleware;
}

export class NaConstants {
    /**
     *服务器状态
     */
    static CommonServerStatusLocale = "common.server.status.";

    /**
     * 屏幕尺寸
     */
    static xs = 480;
    static sm = 768;
    static md = 992;
    static lg = 1200;
    static xl = 1600;
    static minXS = window.innerWidth < NaConstants.xs;
    static minSM = window.innerWidth < NaConstants.sm;
    static minMD = window.innerWidth < NaConstants.md;
    static minLG = window.innerWidth < NaConstants.lg;
    static minXL = window.innerWidth < NaConstants.xl;
}

export class NaContext {
    /**
     * 登录后的用户信息
     */
    static MerchantData: any;

    static Keys = {
        /**
         * LocalStorage的存储key
         */
        TokenDataKey: "NaTokenData",
        /**
         * Cookie的存储key
         */
        LoginSecretKey: "Authorization",
        /**
         * 用于多语言key
         */
        LanguageKey: "na-language"
    };

    /**
     * 设置登录信息
     */
    static setMerchantData(data) {
        try {
            window.localStorage.setItem(NaContext.Keys.TokenDataKey, JSON.stringify(data));
        } catch (e) {
            NaContext.MerchantData = data;
        }
    }

    /** 获取登录信息 */
    static getMerchantData() {
        if (NaContext.MerchantData) {
            return NaContext.MerchantData;
        }
        var data = null;
        try {
            data = JSON.parse(window.localStorage.getItem(NaContext.Keys.TokenDataKey));
        } catch (e) {
            data = null;
        }
        return data;
    }

    /**
     * 获取当前语言,如果用户没有选择，默认走公司语言,兼容两个版版本
     */
    static getLanguage(): string {
        let language = Cookies.get(NaContext.Keys.LanguageKey) === "undefined" ? undefined : Cookies.get(NaContext.Keys.LanguageKey);
        if (!language) {
            let data = NaContext.getMerchantData();
            if (data) {
                language = data.CompanyInfo.LanguageCode;
            }
        }
        return language;
    }

    /**
     * 设置多语言
     * @param language  多语言
     */
    static setLanguage(language: string) {
        var secretExpiresDate = new Date();
        secretExpiresDate.setTime(secretExpiresDate.getTime() + (3600 * 24 * 365 * 1000));
        Cookies.set(NaContext.Keys.LanguageKey, language.toLowerCase(), {
            path: '/',
            expires: secretExpiresDate
        });
    }

    /**
     * 获取当前Token
     */
    static getToken() {
        return Cookies.get("Authorization");
    }

    /**
     * 获取当前ICON地址*/
    static getIconAddress(name: string) {
        return (window['CDN'] + 'icon/' + name + '.jpg');
    }

    static getIconClassName(name: string): string {
        return "iconfont " + name;
    }
}