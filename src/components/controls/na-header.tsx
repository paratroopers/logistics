import * as React from "react";
import {Component} from "react";
import {hashHistory} from 'react-router';
import {Row, Col, Menu, Select, Popover, Avatar, Icon} from 'antd';
import {NaGlobal, NaContext} from "../../util/common";
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
            case "0":
                hashHistory.push({pathname: PathConfig.VIPCenterPage});
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
        const {props: {menuTheme}} = topThis;
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

    renderDoubtContent() {
        return <Row>
            <Col>
                <i style={{color: '#4cafe9'}} className={NaContext.getIconClassName('icon-qq')}></i>
                <span>738114990</span>
            </Col>
            <Col>
                <i style={{color: '#fab200'}} className={NaContext.getIconClassName('icon-youxiang')}></i>
                <span>xuke_break@163.com</span>
            </Col>
            <Col></Col>
        </Row>
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
        </Row> : <Row className="login">
            <a onClick={() => {
                {/*window.location.replace("./index.html#/login");*/}
                hashHistory.push(PathConfig.LoginPage);
            }}>
                <i className={NaContext.getIconClassName('icon-yonghu')}></i>
                <span>登录</span>
            </a>
            <a className="separate">|</a>
            <a onClick={() => {
                {/*window.location.replace("./index.html#/register");*/}
                hashHistory.push(PathConfig.RegisterPage);
            }}>
                <i className={NaContext.getIconClassName('icon-zhuce')}></i>
                <span>注册</span>
            </a>
        </Row>;
    }

    /** 工具*/
    renderTool() {
        const topThis = this;
        return <Row className="tool" type="flex" justify="start" align="middle"
                    style={{height: 80}}>
            {/*<Col >{topThis.renderLanguageSelect()}</Col>*/}
            <Col className="tool-tel">
                <i className={NaContext.getIconClassName('icon-dianhua')}></i>
                <span>400-820-8820</span>
            </Col>
            <Col className="tool-doubt">
                <Popover placement="bottom" content={this.renderDoubtContent()}>
                    <i className={NaContext.getIconClassName('icon-zixun')}></i>
                    <span>咨询客服</span>
                </Popover>
            </Col>
            <Col>{topThis.renderUser()}</Col>
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
            <Col xs={12} sm={12} md={8} lg={5} xl={5}>
                <Row type="flex" justify="start">
                    <Col>
                        <a className="logo" onClick={topThis.onClickLogo.bind(this)}>
                            {typeof logo === "string" ? <img onClick={()=>{
                                hashHistory.push(PathConfig.HomePage);
                            }} src={logo}></img> : logo}
                        </a>
                    </Col>
                </Row>
            </Col>
            <Col xs={0} sm={0} md={12} lg={8} xl={8}>
                {topThis.renderNavigation()}
            </Col>
            <Col xs={9} sm={9} md={2} lg={{offset: 1, span: 10}} xl={{offset: 1, span: 10}}>
                {topThis.renderTool()}
            </Col>
        </Row>;
    }
}

