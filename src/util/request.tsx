import * as request from "superagent";
import * as Mock from "mockjs";
import * as moment from "moment";
import {BaseRequestParam, BaseResponse, Global, Constants, Context} from './common';
import {CommonLocale} from "../locales/localeid";
import {Notification} from "../components/controls/common/notification";
import {message} from 'antd';
import {PathConfig} from '../config/pathconfig';
import { hashHistory} from "react-router";

export class Request<TRequest, TResponse extends BaseResponse> {
    /**
     * 默认参数
     *
     * @type {BaseRequestParam < TRequest >}
     * @memberOf Request
     */
    defaultParam: BaseRequestParam<TRequest> = {
        Url: '',
        Data: null,
        Querys: null,
        RequireToken: true,
        IgnoreError: false,
        Headers: [{"accept": "application/json;odata=verbose"}],
        Prefix: null
    }

    /**
     * 处理Http请求
     *
     * @param {(url : string) => request.SuperAgentRequest} func
     * @param {BaseRequestParam < TRequest >} [param]
     * @returns
     *
     * @memberOf Request
     */
    async processResponse(func: (url: string) => request.SuperAgentRequest, param?: BaseRequestParam<TRequest>, emptyData?: any) {
        //初始化 商户API URL
        if (!param.Url.startsWith("http") && !param.Prefix) {
            param.Prefix = null;
        }

        let request = func(param.Prefix && !param.Url.startsWith("http") ? param.Prefix + param.Url : '' + param.Url);

        /**跨域请求带Cookie传递 */
        // request.withCredentials();
        if (param.Data) {
            request.send(JSON.stringify(param.Data));
        }

        if (param.Querys) {
            request.query(param.Querys);
        }

        if (param.FormData) {
            request.send(param.FormData);
        } else {
            request.type("json");
        }

        //request.send({crossDomain: true});

        if (param.RequireToken) {
            request.set("Authorization", Context.getToken());
        }

        request.set("ClientTimeZone", (moment().utcOffset() / 60).toString());

        if (param.Headers) {
            param.Headers.forEach((entry) => {
                request.set(entry);
            });
        }
        return new Promise<TResponse>((resolve: (response: TResponse) => void, reject: (errorResponse: TResponse) => void) => {
            request
                .end(function (error, response: request.Response): void {
                    if (!response) {
                        if (!param.IgnoreError) {
                            Notification.error({
                                message: Global.intl.formatMessage({id: CommonLocale.Error}),
                                description: Global.intl.formatMessage({id: CommonLocale.ResponseError})
                            },);
                        }
                        resolve(({
                            Status: 1,
                            Data: emptyData
                                ? emptyData
                                : undefined
                        }) as TResponse);
                        return;
                    }
                    if (response.ok) {
                        if (response.body) {
                            if (response.body.Message === "mock") {
                                resolve(Mock.mock(response.body))
                            }
                            if (response.body.Status > 0) {
                                const messageId = Constants.CommonServerStatusLocale + response.body.Status;
                                let message = Global.intl.formatMessage({id: messageId});
                                if (message !== messageId) {
                                    //如果定义了status对应的消息，替换消息内容
                                    response.body.Message = message;
                                }
                            }
                            resolve(response.body);
                        } else {
                            resolve({
                                Status: 1,
                                Data: response.text
                            } as TResponse);
                        }
                    } else {
                        if (!param.IgnoreError) {
                            if (response.unauthorized) {
                                message.error(Global.intl.formatMessage({id: CommonLocale.ResponseUnauthorized}));
                            } else if (response.notFound) {
                                message.error(Global.intl.formatMessage({id: CommonLocale.ResponseNotFound}));

                            } else if (response.badRequest) {
                                message.error(Global.intl.formatMessage({id: CommonLocale.ResponseBadRequest}));

                            } else {
                                message.error(Global.intl.formatMessage({id: CommonLocale.ResponseError}));
                                hashHistory.push(PathConfig.LoginPage);
                            }
                        }
                        resolve(({
                            Status: 1,
                            Data: emptyData
                                ? emptyData
                                : undefined
                        }) as TResponse);
                    }
                });
        });
    }

    /**
     * 构造请求数据
     *
     * @param {IArguments} args
     * @returns {BaseRequestParam < TRequest >}
     *
     * @memberOf Request
     */
    buildData(args: IArguments | any[]): BaseRequestParam<TRequest> {

        if (typeof (args[0]) === "string") {
            return Object.assign({}, this.defaultParam, {
                Url: args[0],
                Data: {...args[1], tenantID: "890501594632818690"},
            })
        } else {
            return Object.assign({}, this.defaultParam, args[0])
        }
    }

    /**
     * 生成服务器请求
     * @param url
     * @param data
     * @param addRandom 是否增加随机数避免加载旧数据
     */
    buildQueryParam(url, data, addRandom?) {
        data = {...data, tenantID: "890501594632818690"};
        if (data) {
            url += "?";
            Object.getOwnPropertyNames(data)
                .forEach(name => {
                    // if (data[name] !== undefined) 
                    {
                        url += name + "=" + encodeURI(data[name]) + "&";
                    }
                });
            if (addRandom) {
                url += Date.now() + "&";
            }

            url = url.slice(0, url.length - 1);
        }
        return url;
    }

    /**
     * Get method
     * @param url
     * @param data
     * @param emptyData response中的空数据，在服务器返回错误时保证前端功能
     * @returns {Promise<TResponse>}
     */
    get(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.get, this.buildData([
            this.buildQueryParam(url, data, true),
            data
        ]), emptyData)
    }

    /**
     * Post method
     * @param url
     * @param data
     * @param emptyData response中的空数据，在系统错误时保证前端功能
     * @returns {Promise<TResponse>}
     */
    post(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.post, this.buildData(arguments), emptyData);
    }

    /**
     * Put method
     * @param url
     * @param data
     * @param emptyData response中的空数据，在系统错误时保证前端功能
     * @returns {Promise<TResponse>}
     */
    put(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.put, this.buildData(arguments), emptyData);
    }

    /**
     * Delete method
     *
     * @param {string} url
     * @param {TRequest} [data]
     * @param {*} [emptyData]
     * @returns {Promise<TResponse>}
     * @memberof Request
     */
    del(url: string, data?: TRequest, emptyData?: any): Promise<TResponse> {
        return this.processResponse(request.delete, this.buildData([
            this.buildQueryParam(url, data),
            data
        ]), emptyData);
    }

    /**
     * FormData post
     *
     * @param {string} url
     * @param {FormData} [formData]
     * @returns
     * @memberof Request
     */
    send(url: string, formData?: FormData) {
        return this.processResponse(request.post, {
            Url: url,
            FormData: formData,
            RequireToken: true
        });
    }

    /**
     *
     * @param type  post、get
     * @param url  地址
     * @param data  参数
     * @param async true 异步，false 同步
     * @param sfuc  成功方法
     * @param error  失败方法
     */
    sendXMLHttpRequest(type: string, url: string, data: any, async: boolean, sfuc: (data) => void, error: (data) => void, isjson: boolean = true, header: any[] = null, hasToken: boolean = false) {
        var xmlhttp = new XMLHttpRequest;
        xmlhttp.onreadystatechange = () => {
            if (xmlhttp.readyState === 4) {
                var d;
                if (isjson) {
                    try {
                        d = JSON.parse(xmlhttp.responseText)
                    } catch (error) {
                        d = xmlhttp.responseText;
                    }
                } else {
                    d = xmlhttp.responseText;
                }
                if ((xmlhttp.status >= 200 && xmlhttp.status < 300) || xmlhttp.status === 304) {
                    sfuc(d);
                } else {
                    error(d);
                }

            }
        };
        xmlhttp.open(type, url, async);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        if (header) {
            header.forEach(function (element) {
                xmlhttp.setRequestHeader(element.key, element.value);
            });
        }
        if (hasToken) {
            xmlhttp.setRequestHeader("Authorization", Context.getToken());
        }
        if (type === "GET" || type === "get" || type === "Get") {//大小写
            xmlhttp.send(data);
        }
        else if (type === "POST" || type === "post" || type === "Post") {
            xmlhttp.send(JSON.stringify(data));
        }
    }
}