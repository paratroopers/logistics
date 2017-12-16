import * as React from "react";
import {Component} from "react";
import {hashHistory} from 'react-router';
import {Row, Col, Menu, Select, Popover, Avatar, Icon} from 'antd';
import {NaGlobal} from "../../util/common";
import {CommonLocale} from "../../locales/localeid";
import {PathConfig} from "../../config/pathconfig";

interface NaHeaderProps {
    /* na-header 同级样式*/
    className?: string;
    logo?: string | React.ReactNode;
    /* logo点击事件*/
    onClickLogo?: () => void;
    /* Menu Theme*/
    menuTheme?: "light" | "dark";
    /* 语言选项发生改变*/
    onChangeLanguage?: (key: any) => void;
    /* 默认语言*/
    defaultLanguageKey?: string;
}

interface NaHeaderStates {
    /** 是否已经登录*/
    isLogin: boolean;
}

export default class NaHeader extends Component<NaHeaderProps, NaHeaderStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: false
        }
    }

    /** User setting*/
    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        switch (key) {
            case "2":
                topThis.setState({isLogin: false});
                break;
            default:
                break;
        }
    }

    /* 导航*/
    renderNavigation() {
        const topThis = this;
        const {props: {menuTheme}, state: {isLogin}} = topThis;
        const {formatMessage} = NaGlobal.intl;

        //Menu style背景透明 background: transparent;
        return <Row type="flex" justify="end">
            <Menu theme={menuTheme ? menuTheme : "dark"}
                  mode="horizontal"
                  defaultSelectedKeys={['1']}
                  style={{lineHeight: '78px', height: 78, fontSize: 16}}
                  onClick={(obj: { item, key, keyPath }) => {
                      hashHistory.push({pathname: obj.key});
                      //console.log(item, key, keyPath);
                      //hashHistory.push({pathname: key, query: {selectedTab: type}});
                  }}
            >
                <Menu.Item key={PathConfig.HomePage}>{formatMessage({id: CommonLocale.HeaderMenuHome})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.CostEstimatePage}>{formatMessage({id: CommonLocale.HeaderMenuCostEstimate})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.CompanyProfilePage}>{formatMessage({id: CommonLocale.HeaderMenuCompanyProfile})}</Menu.Item>
                {isLogin ? <Menu.Item
                    key={PathConfig.VIPCenterPage}>{formatMessage({id: CommonLocale.HeaderMenuVIPCenter})}</Menu.Item> : null}
            </Menu>
        </Row>;
    }

    renderLanguageSelect() {
        const topThis = this;
        const {props: {defaultLanguageKey, onChangeLanguage}} = topThis;
        return <Select defaultValue={defaultLanguageKey ? defaultLanguageKey : "zh"}
                       onChange={(key) => {
                           if (onChangeLanguage)
                               onChangeLanguage(key);
                       }}>
            <Select.Option value="zh">中文</Select.Option>
            <Select.Option value="en">English</Select.Option>
        </Select>;
    }

    renderUserNameContent() {
        const topThis = this;
        return <Menu onClick={topThis.onClickUserMenu.bind(this)}>
            <Menu.Item key="0">
                <Icon type="user"/>
                <span>个人中心</span>
            </Menu.Item>
            <Menu.Item key="1">
                <Icon type="setting"/>
                <span>个人设置</span>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="2">
                <Icon type="poweroff"/>
                <span>注销</span>
            </Menu.Item>
        </Menu>;
    }

    /** 用户*/
    renderUser() {
        const topThis = this;
        const {state: {isLogin}} = topThis;
        return isLogin ? <Row className="tool-user">
            <Col></Col>
            <Col className="tool-user-right">
                <Popover placement="bottomRight"
                         overlayClassName="tool-user-popover"
                         autoAdjustOverflow={true}
                         content={topThis.renderUserNameContent()}
                         trigger="click">
                    <a className="tool-user-right-name">
                        <Avatar style={{marginRight: 5}} src="http://www.famliytree.cn/icon/timor.png"/>
                        Handy
                    </a>
                </Popover>
            </Col>
        </Row> : <Row>
            <a onClick={() => {
                topThis.setState({isLogin: true});
            }}> 登录</a>
            <a> | </a>
            <a onClick={() => {
                topThis.setState({isLogin: false});
            }}>注册 </a>
        </Row>;
    }

    /** 工具*/
    renderTool() {
        const topThis = this;
        return <Row className="tool" type="flex" justify="end" align="middle"
                    style={{height: 80, marginLeft: 50}}>
            {/*<Col >{topThis.renderLanguageSelect()}</Col>*/}
            <Col >{topThis.renderUser()}</Col>
        </Row>;
    }

    onClickLogo() {
        const topThis = this;
        const {props: {onClickLogo}} = topThis;
        if (onClickLogo)
            onClickLogo();
    }

    render() {
        const topThis = this;
        const {props: {className, logo}} = topThis;
        return <Row className={className ? className + " na-header" : "na-header"}>
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
                <Row type="flex" justify="start">
                    <Col>
                        <a className="logo" onClick={topThis.onClickLogo.bind(this)}>
                            {typeof logo === "string" ? <img src={logo}></img> : logo}
                        </a>
                    </Col>
                    <Col className="title">
                        <h1>大陆 Mainland</h1>
                        <p>From Mainland To Word</p>
                    </Col>
                </Row>
            </Col>
            <Col xs={0} sm={0} md={12} lg={12} xl={8}>
                {topThis.renderNavigation()}
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xl={8}>
                {topThis.renderTool()}
            </Col>
        </Row>;
    }
}

