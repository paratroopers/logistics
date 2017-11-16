import * as React from "react";
import {Component} from "react";
import {Link, hashHistory, browserHistory} from "react-router";
import {Layout, Menu, Breadcrumb, Icon, Row, Col, Select, Badge, Popover, Tabs} from "antd";
import {PathConfig}from "../../config/pathconfig";
/* 多语言*/
import {IntlProvider, injectIntl} from 'react-intl';
import {getLocale} from "../../locales";
import {AppLocaleStatic}  from "../../api/model/common-model";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TabPane = Tabs.TabPane;
const {Header, Content, Sider, Footer} = Layout;

interface MasterPageProps {
    onLoaded?: (appLocale?: AppLocaleStatic, theme?: string) => Promise<any>;
}
interface MasterPageStates {
    appLocale?: AppLocaleStatic;
    localeKey: string;
    /* 是否显示导航*/
    navigationDisplay: boolean;
}

export class MasterPage extends Component<MasterPageProps, MasterPageStates> {
    /* 是否为可移动设备*/
    isMobile: boolean;

    constructor(props, context) {
        super(props, context);
        this.state = {
            appLocale: null,
            localeKey: "zh",
            navigationDisplay: true
        };
        this.isMobile = window.innerWidth < 786;
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
        /* 获取当前路由 判断是否隐藏导航*/
        if (browserHistory.getCurrentLocation().pathname == PathConfig.DemoPage) {
            topThis.setState({navigationDisplay: false});
        } else {
            topThis.setState({navigationDisplay: true});
        }
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

    renderLanguageSelect() {
        const topThis = this;
        const {state: {localeKey}} = topThis;
        return <Select value={localeKey}
                       onChange={topThis.onChangeLanguage.bind(this)}>
            <Select.Option value="zh">中文</Select.Option>
            <Select.Option value="en">English</Select.Option>
        </Select>;
    }

    onChangeMessageControl(key) {
        console.log(key);
    }

    renderMessageControl() {
        const topThis = this;
        return <Tabs defaultActiveKey="1" onChange={topThis.onChangeMessageControl.bind(this)}
                     style={{maxWidth: 400}}>
            <TabPane tab="通知(1)" key="1">
                <Row style={{maxHeight: 400, width: "100%", overflowY: "auto"}}>
                    <Col span={24} style={{height: 60, borderBottom: "1px solid #e8e8e8", padding: 20}}>你收到14分新的日报</Col>
                    <Col span={24} style={{height: 60, borderBottom: "1px solid #e8e8e8", padding: 20}}>你收到14分新的日报</Col>
                    <Col span={24} style={{height: 60, borderBottom: "1px solid #e8e8e8", padding: 20}}>你收到14分新的日报</Col>
                    <Col span={24} style={{height: 60, borderBottom: "1px solid #e8e8e8", padding: 20}}>你收到14分新的日报</Col>
                </Row>
                <Row style={{textAlign: "center", height: 40, lineHeight: "40px",cursor:"pointer"}}>清空通知</Row>
            </TabPane>
            <TabPane tab="消息(10)" key="2">
                <Row style={{textAlign: "center", height: 40, lineHeight: "40px",cursor:"pointer"}}>清空消息</Row>
            </TabPane>
            <TabPane tab="待办(100)" key="3">
                <Row style={{textAlign: "center", height: 40, lineHeight: "40px",cursor:"pointer"}}>清空待办</Row>
            </TabPane>
        </Tabs>
    }

    /* 为了children能用 formatMessage({id: LoginPageLocale.Password})的方式*/
    renderMasterPage = injectIntl((props) => {
        const topThis = this;
        const {isMobile, props: {children}, state: {navigationDisplay}} = topThis;
        const MenuItem = Menu.Item;

        return <Layout className="hz-master-page">
            <Header className="header">
                <div className="logo" onClick={() => {
                    hashHistory.push(PathConfig.DemoPage);
                }}></div>
                <Menu theme="dark"
                      mode="horizontal"
                      style={{lineHeight: '64px', float: "left"}}
                      onClick={(param) => {
                          /* 获取当前路由 判断是否隐藏导航*/
                          if (param.key == PathConfig.DemoPage) {
                              topThis.setState({navigationDisplay: false});
                          } else {
                              topThis.setState({navigationDisplay: true});
                          }
                          hashHistory.push(param.key);
                      }}>
                    {isMobile ? null :
                        <MenuItem key={PathConfig.DemoPage}><span><Icon type="api"/>Demo</span></MenuItem>}
                    {isMobile ? null :
                        <MenuItem key={PathConfig.MySpacePage}><span><Icon type="home"/>Space</span></MenuItem>}
                    {isMobile ? <SubMenu title={<span><Icon type="bars"/>Phone Navigation</span>}>
                        <MenuItem key={PathConfig.DemoPage}><span><Icon type="api"/>Demo</span></MenuItem>
                        <MenuItem key={PathConfig.MySpacePage}><span><Icon type="home"/>Space</span></MenuItem>
                        <Menu.Item key={PathConfig.MyMessagePage}> <span><Icon type="sound"/>Message</span></Menu.Item>
                    </SubMenu> : null}
                </Menu>
                <div className="setting">
                    <div className="setting-message">
                        <Popover placement="bottomRight" overlayClassName="setting-message-popover" content={topThis.renderMessageControl()} trigger="click">
                            <Badge count={100}>
                                <span><Icon type="bell" style={{color: "#FFF", fontSize: 18}}/></span>
                            </Badge>
                        </Popover>
                    </div>
                </div>
            </Header>
            <Layout>
                {navigationDisplay ? null :
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu mode="inline"
                              defaultSelectedKeys={['1']}
                              defaultOpenKeys={['sub1']}
                              style={{height: '100%'}}
                              onClick={(param) => {
                                  hashHistory.push(param.key);
                              }}>
                            <SubMenu key="demo" title={<span><Icon type="user"/>Antd</span>}>
                                <MenuItem key={PathConfig.DemoTimeLinePage}>TimeLine 时间轴</MenuItem>
                                <MenuItem key={PathConfig.DemoCarouselPage}>DemoCarousel 时间轴</MenuItem>
                            </SubMenu>
                        </Menu>
                    </Sider>}
                <Layout style={{padding: 24}}>
                    <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
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
