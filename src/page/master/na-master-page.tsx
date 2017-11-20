import * as React from "react";
import {Component} from "react";
import {Layout, Select} from "antd";
/* 多语言*/
import {IntlProvider, injectIntl} from 'react-intl';
import {ReducersMapObject, createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {getLocale} from "../../locales";
import {AppLocaleStatic} from "../../api/model/common-model";
import {NaLocalProvider} from '../../components/controls/na-localprovider';
import {NaGlobal} from "../../util/common";

const {Header, Content, Footer} = Layout;

interface NaMasterPageProps {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
    reducers?: ReducersMapObject;
}

interface NaMasterPageStates {
    appLocale?: AppLocaleStatic;
    localeKey: string;
}

export class NaMasterPage extends Component<NaMasterPageProps, NaMasterPageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null,
            localeKey: "zh"
        };
        this.initRedux();
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


    initRedux() {
        NaGlobal.store = createStore(combineReducers(this.props.reducers)); //创建store
        //Window.prototype.naDispatch = (action) => NaGlobal.store.dispatch(action); //给window对象增加dispatch action方法

    }

    /* 为了children能用 formatMessage({id: LoginPageLocale.Password})的方式 组件用injectIntl包含*/
    renderMasterPage = injectIntl((props) => {
        NaGlobal.intl = props.intl;
        const topThis = this;
        const {props: {children}} = topThis;
        return <Layout>
            <Header>
                <div>{topThis.renderLanguageSelect()}</div>
            </Header>
            <Content>
                {children}
            </Content>
            <Footer>

            </Footer>
        </Layout>
    });

    render() {
        const {appLocale} = this.state;
        const content = appLocale ?
            <NaLocalProvider locale={appLocale.antd}>
                <IntlProvider key={appLocale.locale}
                              locale={appLocale.locale}
                              messages={appLocale.messages}>
                    <this.renderMasterPage></this.renderMasterPage>
                </IntlProvider></NaLocalProvider>
            : <div></div>;
        return <Provider store={NaGlobal.store}>
            {content}
        </Provider>;

    }
}
