import * as React from "react";
import {Component} from "react";
import {hashHistory} from 'react-router';
import {Row, Col, Menu, Select, Popover,Avatar,Icon} from 'antd';
import {NaGlobal} from "../../util/common";
import {CommonLocale} from "../../locales/localeid";
import {PathConfig} from "../../config/pathconfig";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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

    /* 导航*/
    renderNavigation() {
        const topThis = this;
        const {props: {menuTheme}} = topThis;
        const {formatMessage} = NaGlobal.intl;

        //Menu style背景透明 background: transparent;
        return <Col>
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
                <Menu.Item
                    key={PathConfig.VIPCenterPage}>{formatMessage({id: CommonLocale.HeaderMenuVIPCenter})}</Menu.Item>
            </Menu>
        </Col>;
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
        // const topThis = this;
        return <Menu>
                <Menu.Item key="0">
                <Icon type="user" />
                <span>个人中心</span>
            </Menu.Item>
            <Menu.Item key="1">
                <Icon type="setting" />
                <span>设置</span>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="poweroff" />
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
                <Popover placement="bottomRight" content={topThis.renderUserNameContent()}>
                    <a className="tool-user-right-name">
                        <Avatar style={{marginRight:5}} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
        return <Col>
            <Row className="tool" type="flex" justify="space-between" align="middle"
                 style={{height: 80, marginLeft: 50}}>
                {/*<Col >{topThis.renderLanguageSelect()}</Col>*/}
                <Col >{topThis.renderUser()}</Col>
            </Row>
        </Col>;
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
            <Col xs={24} sm={24} md={2} lg={5} xl={5}>
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
            <Col xs={0} sm={0} md={22} lg={19} xl={19}>
                <Row type="flex" justify="end">
                    {topThis.renderNavigation()}
                    {topThis.renderTool()}
                </Row>
            </Col>
        </Row>;
    }
}

