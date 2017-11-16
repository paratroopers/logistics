import * as React from "react";
import {Component} from "react";
import {Layout, Select} from "antd";
/* 多语言*/
import {IntlProvider, injectIntl} from 'react-intl';
import {getLocale} from "../../locales";
import {AppLocaleStatic}  from "../../api/model/common-model";
const {Header, Content} = Layout;

interface MasterPageProps {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
}
interface MasterPageStates {
    appLocale?: AppLocaleStatic;
    localeKey: string;
}

export class MasterPage extends Component<MasterPageProps, MasterPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null,
            localeKey: "zh"
        };
    }

    /* 语言*/
    onChangeLanguage = (key) => {
        const topThis = this;
        topThis.setState({localeKey: key});
        topThis.loadLanguage(key);
    }

    componentWillMount() {
        const topThis = this;
        /* 初始化语言*/
        const {state: {localeKey}} = topThis;
        topThis.loadLanguage(localeKey);
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

    /* 多语言控件*/
    renderLanguageSelect() {
        const topThis = this;
        const {state: {localeKey}} = topThis;
        return <Select value={localeKey}
                       onChange={topThis.onChangeLanguage.bind(this)}>
            <Select.Option value="zh">中文</Select.Option>
            <Select.Option value="en">English</Select.Option>
        </Select>;
    }

    /* 为了children能用 formatMessage({id: LoginPageLocale.Password})的方式*/
    renderMasterPage = injectIntl((props) => {
        const topThis = this;
        const {props: {children}} = topThis;

        return <Layout>
            <Header>
                Header
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    });

    render() {
        const topThis = this;
        const {state: {appLocale}} = topThis;
        return appLocale ? <IntlProvider key={appLocale.locale}
                                         locale={appLocale.locale}
                                         messages={appLocale.messages}>
            <topThis.renderMasterPage></topThis.renderMasterPage>
        </IntlProvider> : null;
    }
}
