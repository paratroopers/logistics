import {SagaMiddleware} from "redux-saga";
import {Cookies} from "./cookie";
import {Store} from "redux";
import {CommonLocale} from "../locales/localeid";
import {Notification} from "../components/controls/common/notification";

export interface Base {
}

export interface BaseRequest extends Base {
}

export interface BaseResponse extends Base {
    /**
     * 数据
     *
     * @type {任意类型}
     * @memberOf BaseResponse
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

export interface BaseRequestParam<T> {
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
    Querys?: Base;
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

export class Context {
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
            window.localStorage.setItem(Context.Keys.TokenDataKey, JSON.stringify(data));
        } catch (e) {
            Context.MerchantData = data;
        }
    }

    /** 获取登录信息 */
    static getMerchantData() {
        if (Context.MerchantData) {
            return Context.MerchantData;
        }
        var data = null;
        try {
            data = JSON.parse(window.localStorage.getItem(Context.Keys.TokenDataKey));
        } catch (e) {
            data = null;
        }
        return data;
    }

    /**
     * 获取当前语言,如果用户没有选择，默认走公司语言,兼容两个版版本
     */
    static getLanguage(): string {
        let language = Cookies.get(Context.Keys.LanguageKey) === "undefined" ? undefined : Cookies.get(Context.Keys.LanguageKey);
        if (!language) {
            let data = Context.getMerchantData();
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
        Cookies.set(Context.Keys.LanguageKey, language.toLowerCase(), {
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

    /** 返回系统Status*/
    static OpenMessage(Status:number){
        const messageId = NaConstants.CommonServerStatusLocale + Status;
        Notification.error({
            message: NaGlobal.intl.formatMessage({id: CommonLocale.Error}),
            description: NaGlobal.intl.formatMessage({id: messageId})
        },);
    }
}