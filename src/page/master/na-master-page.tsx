import * as React from "react";
import {Component} from "react";
import {Layout} from "antd";
/* 多语言*/
import {IntlProvider, injectIntl} from 'react-intl';
import {ReducersMapObject, createStore, combineReducers} from "redux";
import {Provider} from "react-redux";
import {getLocale} from "../../locales";
import {CommonLocale} from "../../locales/localeid";
import {AppLocaleStatic} from "../../api/model/common-model";
import {NaLocalProvider} from '../../components/controls/na-localprovider';
import NaHeader from "../../components/controls/na-header";
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

    /* 为了children能用 formatMessage({id: LoginPageLocale.Password})的方式 组件用injectIntl包含*/
    renderMasterPage = injectIntl((props) => {
        NaGlobal.intl = props.intl;
        const topThis = this;
        const {props: {children}, state: {localeKey}} = topThis;
        const {formatMessage} = NaGlobal.intl;
        return <Layout>
            <Header style={{position: 'fixed', width: '100%', height: 80, zIndex: 1, background: "#FFF"}}>
                <NaHeader
                    menuTheme={"light"}
                    logo={"http://a3.qpic.cn/psb?/V13ZnpTW0vonqf/WWKEbbdMdJC6AYcoZQ7bLZI6UcuHRq0ELFm3Vw*WAi4!/b/dG0BAAAAAAAA&bo=QABAAEAAQAADCSw!&rf=viewer_4"}
                    defaultLanguageKey={localeKey}
                    onChangeLanguage={topThis.onChangeLanguage.bind(this)}
                    logoName={"http://a2.qpic.cn/psb?/V13ZnpTW0vonqf/qx4ufATm2nUuH6mb6g5B.4RztJRniAH5CHIyYByK8gM!/b/dOIAAAAAAAAA&bo=5QBAAOUAQAADCSw!&rf=viewer_4"}></NaHeader>
            </Header>
            <Content style={{background: "#FFF"}}>
                {children}
            </Content>
            <Footer style={{textAlign: 'center'}}>
                Ant Design ©2016 Created by Ant UED
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
