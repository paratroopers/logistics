import {
    remove,
    each,
    isFunction,
    isEqual,
    isArray,
    fill,
    difference,
    differenceWith,
    slice,
    concat,
    isNumber,
    groupBy,
    defaultsDeep,
} from "lodash";
import * as scrollIntoView from "dom-scroll-into-view";
import {Constants}from "./common";
// import {ScreenModeEnum}from "../api/model/common";
import {ModelNameSpace} from '../model/model';


export class Util {
    /**
     * 生成guid
     * @returns {string}
     */
    static guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 将给定参数转换成字符串，如果不是字符串，则返回默认值
     * @param param
     * @param defaultValue 没有默认值则返回undefined
     */
    static parseStr(param, defaultValue?: string): string {
        if (param !== null) {
            let type = typeof param;
            if (type !== "object" && type !== "function") {
                //不是object和函数，则直接返回字符串
                return param + "";
            }
        }
        return defaultValue;
    }

    /**
     * 将给定参数转换成数字，如果不能转换，则返回默认值
     * @param param
     * @param defaultValue 没有默认值则返回undefined
     */
    static parseNumber(param, defaultValue?: number): number {
        // tslint:disable-next-line:triple-equals
        if (param != null) {
            let type = typeof param;
            // tslint:disable-next-line:triple-equals
            if (type != "object" && type != "function" && !isNaN(param)) {
                //不是object和函数并且可转成数字，转换成数字返回
                return Number(param);
            }
        }
        return defaultValue;
    }

    static isNumber(value) {
        return isNumber(value);
    }

    static ScrollToTop() {
        scrollIntoView(document.body, document, {alignWithTop: true});
    }

    /**
     * 获取QueryString中的值
     * @param key
     * @returns {any}
     */
    static getQueryString(key): string {
        var reg = new RegExp("(^|&|\\?)" + key + "=([^&]*)(&|$)", "i");
        //先从URL参数中取
        //不能直接从全部里边取，因为这样会把前端Router的hash也认为是参数的值
        var r = window.location.search.substr(1).match(reg);
        if (r) {
            return decodeURIComponent(r[2]);
        }
        //如果URL中参数没有，从前端router参数中取
        r = window.location.hash.substr(1).match(reg);
        if (r) {
            return decodeURIComponent(r[2]);
        }
        return null;
    }

    static getFileExt(fileName: string) {
        return ((/[.]/.exec(fileName)) ? /[^.]+$/.exec(fileName)[0] : "").toLowerCase();
    }

    /**
     * 深度对比两个对象，但是同一个对象相当于===
     * @param value
     * @param other
     * @returns {boolean}
     */
    static isEqual(value, other) {
        return isEqual(value, other);
    }

    /**
     * 深度复制两个对象
     * @param obj
     * @returns {any}
     */
    static deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        return JSON.parse(JSON.stringify(obj));
    }

    /**
     * 深度合并对象的值
     * @param object
     * @param sources
     * @returns {TResult}
     */
    static defaultsDeep(object, ...sources: any[]) {
        return defaultsDeep(object, sources);
    }

    /**
     * 根据传入的解释器，用来获取对象的属性
     * @param obj
     * @param desc
     * @returns {any}
     */
    static getPropByKeyFunc(obj: any, desc: string | ((record) => any)) {
        if (obj && obj !== null) {
            if (typeof desc === "string") {
                return obj[desc];
            } else {
                return desc(obj);
            }
        } else {
            return null;
        }
    }

    /**
     * 从数组中移除一个满足条件的对象
     * @param array
     * @param predicate
     * @returns {T[]} 返回删除的数组
     */
    static remove(array: any[], predicate: (value: any, index?, arr?) => boolean): any[] {
        return remove(array, predicate);
    }

    /**
     * insert in position of array
     * @param array
     * @param value
     * @param index
     * @returns {any} new created array with inserted
     */
    static insert(array: any[], value: any, index: number) {
        if (array) {
            if (index > 0) {
                const length = array.length;
                if (index >= length) {
                    return concat(array, value);
                } else {
                    const part1 = slice(array, 0, index);
                    const part2 = slice(array, index, length);
                    return concat(part1, value, part2);
                }
            } else {
                return concat(value, array);
            }
        } else {
            return null;
        }
    }

    /**
     * Converts value to an array
     *
     * @static
     * @param {*} value
     * @param {boolean} [removeStrEmpty=true] String.Empty是否作为空值
     * @returns
     * @memberof AkUtil
     */
    static toArray(value: any, removeStrEmpty: boolean = true) {
        let ret = value;
        if (value === undefined) {
            ret = undefined;
        } else if (value === null) {
            ret = null;
        } else if (removeStrEmpty && value === "") {
            ret = null;
        } else if (!Array.isArray(value)) {
            ret = [value];
        }
        return ret;
    }

    /**
     * 和insert区别是插入到当前列表而不是返回新列表
     * @param array
     * @param value
     * @param index
     */
    static insertInto(array: any[], value: any, index: number) {
        if (array) {
            const length = array.length;
            if (index >= length) {
                array.push(value);
            } else {
                var start = index > 0 ? index : 0;
                let toReplace = value;
                var temp;
                while (start < length) {
                    temp = array[start];
                    array[start] = toReplace;
                    toReplace = temp;
                    start++;
                }
                array.push(toReplace);
            }
        }
        return array;
    }

    /**
     * 在指定位位置覆盖元素（会修改传入的数组）
     * @param array 原始数组
     * @param value 插入对象
     * @param start 开始位置
     * @param end 结束位置
     * @returns {T[]}
     */
    static fill(array: any[], value: any, start?: number, end?: number) {
        return fill(array, value, start, end);
    }

    /**
     * 遍历对象或数组
     * @param obj
     * @param iteratee
     * @returns {any}
     */
    static each(obj, iteratee: (value, idx) => any): any {
        return each(obj, iteratee);
    }

    /**
     * 根据条件将数组分组，生成以key分组的dictionary
     * @param collection
     * @param iteratee 返回分组key
     * @returns {Dictionary<T[]>}
     */
    static groupBy(collection, iteratee: (value, idx) => any) {
        return groupBy(collection, iteratee);
    }

    /**
     * 创建一个差异化的数组
     * @param array
     * @param values
     */
    static difference<T>(array: T[], ...values: Array<T[]>) {
        return difference(array, ...values);
    }

    /**
     * 根据传入的对比函数创建一个差异化的数组
     * @param array
     * @param values
     * @param comparator
     * @returns {any[]}
     */
    static differenceWith(array, values, comparator: (v1, v2) => boolean) {
        return differenceWith(array, values, comparator);
    }

    static stringSize(str: string) {
        return str ? str.length : 0;
    }

    static isFunction(value) {
        return isFunction(value)
    }

    static isArray(value) {
        return isArray(value)
    }

    /**
     * 将数组转成对象，key为指定的属性
     * @param arr
     * @param keyProp 指定数组对象中的属性为结果Object的key
     * @returns {{}}
     */
    static arrayToObject(arr: any[], keyProp: string): any {
        let rs = {};
        if (arr && arr.length > 0) {
            this.each(arr, v => {
                const key = v[keyProp];
                if (key !== undefined) {
                    rs[key] = v;
                }
            });
        }
        return rs;
    }

    static noContentIcon = "data:image/png;base64,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";

    static bytesToSize(bytes) {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        const i: number = Math.floor(Math.log(bytes) / Math.log(1024));
        const num: number = Math.round(bytes / Math.pow(1024, i));
        return `${num} ${sizes[i]}`;
    }

    static JSONParse(value: string) {
        if (!value) return undefined;
        if ((value.startsWith("{") && value.endsWith("}")) ||
            (value.startsWith("[") && value.endsWith("]")) ||
            (value.startsWith("\"") && value.endsWith("\""))) {
            try {
                return JSON.parse(value);
            } catch (error) {
            }
        }

        return value;
    }

    /**
     * To Boolean
     *
     * @static
     * @param {any} value
     * @returns
     * @memberof AkUtil
     */
    static toBoolean(value) {
        if (typeof value === "string") {
            switch (value.toLowerCase().trim()) {
                case "true":
                case "1":
                    return true;
                case "false":
                case "0":
                case null:
                    return false;
                default:
                    return Boolean(value);
            }
        } else {
            return value;
        }
    }

    static getScrrenMode(innerWidth) {
        let mode = 0;
        if (innerWidth < Constants.xl) {
            mode = ModelNameSpace.ScreenModeEnum.xl;
        }
        if (innerWidth < Constants.lg) {
            mode = ModelNameSpace.ScreenModeEnum.lg;
        }
        if (innerWidth < Constants.md) {
            mode = ModelNameSpace.ScreenModeEnum.md;
        }
        if (innerWidth < Constants.sm) {
            mode = ModelNameSpace.ScreenModeEnum.sm;
        }
        if (innerWidth < Constants.xs) {
            mode = ModelNameSpace.ScreenModeEnum.sm;
        }
        return mode;
    }

    static isMobile() {
        return window.innerWidth < 768;
    }

    /** 获取表单错误*/
    static hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
}