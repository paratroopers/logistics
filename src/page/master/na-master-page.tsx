import * as React from "react";
import {Component} from "react";
/* 多语言*/
import {IntlProvider, injectIntl} from 'react-intl';
import {ReducersMapObject, createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {getLocale} from "../../locales";
import {AppLocaleStatic, ScreenModeEnum} from "../../api/model/common-model";
import {NaLocalProvider} from '../../components/controls/na-localprovider';
import {NaMasterMobilePage} from './na-master-mobile-page';
import {NaMasterWebPage} from './na-master-web-page';
import {NaGlobal, NaConstants} from "../../util/common";
import {NaUtil} from "../../util/util";

interface NaMasterPageProps {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
    reducers?: ReducersMapObject;
}

interface NaMasterPageStates {
    appLocale?: AppLocaleStatic;
    localeKey: string;
    mode: ScreenModeEnum;
}

let timeout;
let currentValue;
export class NaMasterPage extends Component<NaMasterPageProps, NaMasterPageStates> {
    constructor(props, context) {
        super(props, context);

        this.state = {
            appLocale: null,
            localeKey: "zh",
            mode: NaUtil.getScrrenMode(window.innerWidth)
        };
        this.initRedux();
    }

    /**
     * 监视屏幕
     **/
    onWindowResize() {
        const topThis = this;
        const {state: {mode}} = topThis;
        topThis.fetch(window.innerWidth, (data) => {
            console.log(data);
            if ((data === ScreenModeEnum.sm && mode !== ScreenModeEnum.sm) || (data !== ScreenModeEnum.sm && mode === ScreenModeEnum.sm)) {
                topThis.setState({mode: data});
            }
        });
    }

    /**
     * 获取最终mode
     * */
    fetch(value, callback) {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;
        function fake() {
            if (currentValue === value) {
                callback(NaUtil.getScrrenMode(value));
            }
        }

        timeout = setTimeout(fake, 1000);
    }


    /* 语言*/
    onChangeLanguage = (key: any) => {
        const topThis = this;
        topThis.setState({localeKey: key});
        topThis.loadLanguage(key.toString());
    }

    componentWillMount() {
        const topThis = this;
        /* 初始化语言*/
        const {state: {localeKey}} = topThis;
        topThis.loadLanguage(localeKey);

        /* 装载事件-监视屏幕大小*/
        window.addEventListener('resize', topThis.onWindowResize.bind(this));
    }

    componentWillUnmount() {
        const topThis = this;
        /* 卸载-监视屏幕大小*/
        window.removeEventListener('resize', topThis.onWindowResize.bind(this))
    }

    loadLanguage(language: string) {
        let theme;
        const {props: {onLoaded}} = this;
        getLocale(language ? language : "zh").then(data => {
            if (onLoaded) {
                onLoaded(data, theme).then(d => {
                    data.messages = {...data.messages, ...d};
                    this.setState({appLocale: data});
                });
            } else {
                this.setState({appLocale: data});
            }
        });
    }

    initRedux() {
        NaGlobal.store = createStore(combineReducers(this.props.reducers)); //创建store
        //Window.prototype.naDispatch = (action) => NaGlobal.store.dispatch(action); //给window对象增加dispatch action方法
    }

    /*为了children能用 formatMessage({id: LoginPageLocale.Password})的方式 组件用injectIntl包含*/
    renderMasterPage = injectIntl((props) => {
        NaGlobal.intl = props.intl;
        const topThis = this;
        const {props: {children}, state: {localeKey, mode}} = topThis;
        const Master = (mode === ScreenModeEnum.sm) ?
            <NaMasterMobilePage>{children}</NaMasterMobilePage> :
            <NaMasterWebPage localeKey={localeKey}
                             onChangeLanguage={this.onChangeLanguage.bind(this)}>{children}</NaMasterWebPage>;
        return Master;
    });

    render() {
        const topThis = this;
        const {state: {appLocale}} = topThis;
        const content = appLocale ?
            <NaLocalProvider locale={appLocale.antd}>
                <IntlProvider key={appLocale.locale}
                              locale={appLocale.locale}
                              messages={appLocale.messages}>
                    <topThis.renderMasterPage></topThis.renderMasterPage>
                </IntlProvider></NaLocalProvider>
            : <div></div>;
        return <Provider store={NaGlobal.store}>
            {content}
        </Provider>;
    }
}