import * as React from 'react'
import {Component} from 'react'
import {LocaleProvider} from 'antd';
import {connect} from "react-redux";
import {ModelNameSpace} from "../model/model";
import {getLocale} from "../locales";
import {IntlProvider, injectIntl} from 'react-intl';
import {Global} from "../util/common";

export interface LocalProviderProps {
    localeKey?: string;
    onLoaded?: (appLocale?: ModelNameSpace.AppLocaleStatic, theme?: string) => Promise<any>;
}

export interface LocalProviderStates {
    localeKey?: string;
    appLocale?: ModelNameSpace.AppLocaleStatic;
}

class LocalProvider extends Component<LocalProviderProps, LocalProviderStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null,
            localeKey: props.localeKey ? props.localeKey : "zh"
        };
    }

    componentWillMount() {
        const topThis = this;
        /* 初始化语言*/
        const {state: {localeKey}} = topThis;
        topThis.loadLanguage(localeKey);

    }

    componentWillReceiveProps(nextProps) {
        this.loadLanguage(nextProps.localeKey);
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

    renderInjectIntl = injectIntl((props) => {
        Global.intl = props.intl;
        const topThis = this;
        const {props: {children}} = topThis;
        return <div>{children}</div>;
    });

    render() {
        const topThis = this;
        const {state: {appLocale}} = topThis;
        return appLocale ? <LocaleProvider locale={appLocale.antd}>
            <IntlProvider key={appLocale.locale}
                          locale={appLocale.locale}
                          messages={appLocale.messages}>
                <this.renderInjectIntl></this.renderInjectIntl>
            </IntlProvider>
        </LocaleProvider> : null;
    }
}

const mapStateToProps = (state) => {
    return {
        localeKey: state.web.languageKey
    }
}
export default connect(mapStateToProps)(LocalProvider);
