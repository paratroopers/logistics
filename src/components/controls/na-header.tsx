import * as React from "react";
import {Component} from "react";
import {Row, Col, Menu, Select} from 'antd';
const {SubMenu} = Menu;
import {NaGlobal} from "../../util/common";
import {CommonLocale} from "../../locales/localeid";

interface NaHeaderProps {
    /* na-header 同级样式*/
    className?: string;
    logoName?: string | React.ReactNode;
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

}

export default class NaHeader extends Component<NaHeaderProps, NaHeaderStates> {
    constructor(props, context) {
        super(props, context);
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
                  style={{lineHeight: '80px', height: 80, fontSize: 16}}
                  onClick={({item, key, keyPath}) => {
                      console.log(item, key, keyPath);
                  }}
            >
                <Menu.Item key="1">{formatMessage({id: CommonLocale.HeaderMenuHome})}</Menu.Item>
                <Menu.Item key="2">{formatMessage({id: CommonLocale.HeaderMenuGuide})}</Menu.Item>
                <Menu.Item key="3">{formatMessage({id: CommonLocale.HeaderMenuComponents})}</Menu.Item>
                <Menu.Item key="4">{formatMessage({id: CommonLocale.HeaderMenuHeader})}</Menu.Item>
                <Menu.Item key="5">{formatMessage({id: CommonLocale.HeaderMenuBanner})}</Menu.Item>
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

    /* 工具*/
    renderTool() {
        const topThis = this;
        return <Col>
            <Row type="flex" justify="space-between" align="middle" style={{height: 80}}>
                <Col >{topThis.renderLanguageSelect()}</Col>
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
        const {props: {className, logo, logoName}} = topThis;
        return <Row className={className ? className + " na-header" : "na-header"}>
            <Col xs={24} sm={24} md={8} lg={8} xl={5}>
                <a className="logo" onClick={topThis.onClickLogo.bind(this)}
                   style={{lineHeight: '80px', height: 80, fontSize: 14}}>
                    {typeof logo === "string" ? <img src={logo}></img> : logo}
                    {typeof logoName === "string" ? <img src={logoName}></img> : logoName}
                </a>
            </Col>
            <Col xs={0} sm={0} md={16} lg={16} xl={19}>
                <Row type="flex" justify="end">
                    {topThis.renderNavigation()}
                    {topThis.renderTool()}
                </Row>
            </Col>
        </Row>;
    }
}

