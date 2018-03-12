import {SagaMiddleware} from "redux-saga";
import {Cookies} from "./cookie";
import {Store} from "redux";
import {CommonLocale} from "../locales/localeid";
import {ModelNameSpace} from '../model/model';

import {Notification} from "../components-v1/notification";


export enum SelectType {
    CustomerOrder = 1,
    Member = 2,
    WarehouseAdmin = 3,
    CustomerService = 4,
    ExpressNo = 5,
    channel = 6,
    Agent = 7,
    CustomerOrderMerge =8,
    CustomerOrderMergeWaitForApproveStep =9
}

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

export class Global {
    static store: Store<any>;
    static intl: ReactIntl.InjectedIntl;
    static saga: SagaMiddleware;
    static user: SagaMiddleware;
}

export class Constants {
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
    static minXS = window.innerWidth < Constants.xs;
    static minSM = window.innerWidth < Constants.sm;
    static minMD = window.innerWidth < Constants.md;
    static minLG = window.innerWidth < Constants.lg;
    static minXL = window.innerWidth < Constants.xl;

    // OrderIn	    0	仓库管理-订单入库	step=0、isAdmin=true	                        0待确认、1已确认、2仓库退货
    // WaitPackage	1	我的订单-待打包	    step=1、customerOrderStatus=1、isAdmin=false	1待打包
    // WaitApprove	2	我的订单-待审核	    step=12、isAdmin=false	                        1客户确认（step:1）、2仓库打包（step:2）
    // OrderConfirm	3	客服管理-订单确认	step=1、isAdmin=true	                        0待确认
    // OrderMerge	4	仓库管理-合并打包	step=2、isAdmin=true	                        0待确认
    // WaitPay	    5	我的订单-待付款	    step=3、isAdmin=false	                        0待确认
    // OrderOut 	6	仓库管理-订单出库	step=4、isAdmin=true	                        0待确认、1已确认

    /** 阶段订单Step*/
    static getOrderStep(typeEnum:ModelNameSpace.OrderTypeEnum){
        const {OrderTypeEnum} = ModelNameSpace;
        let result = 0;
        switch (typeEnum) {
            case OrderTypeEnum.OrderIn:
                result = 0;
                break;
            case OrderTypeEnum.WaitPackage:
                result = 1;
                break;
            case OrderTypeEnum.WaitApprove:
                result = 12;
                break;
            case OrderTypeEnum.OrderConfirm:
                result = 1;
                break;
            case OrderTypeEnum.OrderMerge:
                result = 2;
                break;
            case OrderTypeEnum.WaitPay:
                result = 3;
                break;
            case OrderTypeEnum.OrderOut:
                result = 4;
                break;
        }
        return result;
    }

    /** 阶段订单状态解析*/
    static getOrderStatusByEnum(typeEnum:ModelNameSpace.OrderTypeEnum,statusEnum:ModelNameSpace.OrderStatusEnum) {
        return Global.intl.formatMessage({id: "customer.order.status." + typeEnum.toString() + "." + statusEnum.toString()});
    }

    /** 阶段订单状态解析*/
    static getOrderStatusByString(typeEnum:ModelNameSpace.OrderTypeEnum,statusEnum:string){
        return Global.intl.formatMessage({id: "customer.order.status." + typeEnum.toString() + "." + statusEnum.toString()});
    }

    /** 阶段订单状态解析*/
    static getOrderStatusByNumber(typeEnum:ModelNameSpace.OrderTypeEnum,statusEnum:number){
        return Global.intl.formatMessage({id: "customer.order.status." + typeEnum.toString() + "." + statusEnum.toString()});
    }
}

export class Context {
    /**
     * 登录后的用户信息
     */
    static MerchantData: any;

    /** 默认Key键值*/
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

    /** 获取用户信息*/
    static getCurrentUser(): ModelNameSpace.UserModel {
        return JSON.parse(window.localStorage.getItem('UserInfo'));
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
     * 获取图片文件的地址*/
    static getImageUrl(Image: string) {
        return (window['CDN'] + 'icon/' + Image);
    }

    /**
     * 获取Icon的ClassName*/
    static getIconClassName(name: string): string {
        return "iconfont " + name;
    }

    /** 返回系统Status*/
    static OpenMessage(Status: number) {
        const messageId = Constants.CommonServerStatusLocale + Status;
        Notification.error({
            message: Global.intl.formatMessage({id: CommonLocale.Error}),
            description: Global.intl.formatMessage({id: messageId})
        },);
    }
}