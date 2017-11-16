import {addLocaleData} from "react-intl";
import * as en from "react-intl/locale-data/en";
import * as zh from "react-intl/locale-data/zh";
import {AppLocaleStatic}  from "../api/model/common-model";
import * as antdEn from "antd/lib/locale-provider/en_US";

export async function getLocale(language?: string): Promise<AppLocaleStatic> {
    if (!language) {
        let DEFAULT_LOCALE = 'zh-CN';
        language = navigator.language || (navigator as any).browserLanguage || DEFAULT_LOCALE;
    }

    let languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

    let appLocaleStatic: AppLocaleStatic = {};
    return new Promise<AppLocaleStatic>((resolve: (locale) => void, reject: (reason: any) => void) => {
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
                    appLocaleStatic.antd = null;
                    appLocaleStatic.messages = require("./zh.json");
                    resolve(appLocaleStatic);
                }, "zh.json");
                break;
        }
    });
}
