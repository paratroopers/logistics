import {addLocaleData} from "react-intl";
import * as en from "react-intl/locale-data/en";
import * as zh from "react-intl/locale-data/zh";
// import {AppLocaleStatic}  from "../api/model/common";
import {ModelNameSpace} from '../model/model';
import antdEn from "antd/lib/locale-provider/en_US";
import antdCN from "antd/lib/locale-provider/zh_CN";

export async function getLocale(language?: string): Promise<ModelNameSpace.AppLocaleStatic> {
    if (!language) {
        let DEFAULT_LOCALE = 'zh-CN';
        language = navigator.language || (navigator as any).browserLanguage || DEFAULT_LOCALE;
    }

    let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

    let appLocaleStatic: ModelNameSpace.AppLocaleStatic = {};
    return new Promise<ModelNameSpace.AppLocaleStatic>((resolve: (locale) => void, reject: (reason: any) => void) => {
        switch (languageWithoutRegionCode) {
            case 'en':
                addLocaleData([...en]);
                require.ensure([], () => {
                    appLocaleStatic.locale = languageWithoutRegionCode;
                    appLocaleStatic.antd = antdEn;
                    appLocaleStatic.messages = require("./en.json");
                    resolve(appLocaleStatic)
                }, "en.json");
                break;
            default:
                addLocaleData([...zh]);
                require.ensure([], () => {
                    appLocaleStatic.locale = languageWithoutRegionCode;
                    appLocaleStatic.antd = antdCN;
                    appLocaleStatic.messages = require("./zh.json");
                    resolve(appLocaleStatic);
                }, "zh.json");
                break;
        }
    });
}
