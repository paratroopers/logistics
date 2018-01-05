import * as React from "react";
import {Component} from "react";
import {hashHistory} from 'react-router';
import {Row, Col, Menu, Select, Popover, Avatar, Icon, Dropdown} from 'antd';
import {NaGlobal, Context} from "../../../util/common";
import {CommonLocale} from "../../../locales/localeid";
import {PathConfig} from "../../../config/pathconfig";
import {connect} from "react-redux";
import {Cookies} from '../../../util/cookie';
import {isBoolean, isNullOrUndefined} from "util";
import {HeaderLogo} from './index-header-logo';
import {HeaderSetting} from './index-header-settings';
import {HeaderNavigation, NavigationType} from './index-header-navigation';

interface HeaderProps {
    /* na-header 同级样式*/
    className?: string;
    logo?: string | React.ReactNode;
    /* Menu Theme*/
    menuTheme?: "light" | "dark";
    /* 语言选项发生改变*/
    onChangeLanguage?: (key: any) => void;
    /* 默认语言*/
    defaultLanguageKey?: string;
    /** 是否已经登录*/
    isLogin?: boolean;
}

interface HeaderStates {
    /** 是否已经登录*/
    isLogin: boolean;
}

class Header extends Component<HeaderProps, HeaderStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: props.isLogin ? props.isLogin : false
        }
    }

    componentDidMount() {
        const topThis = this;
        const data = Context.getMerchantData();
        if (!isNullOrUndefined(data) && isBoolean(data.isLogin)) {
            topThis.setState({isLogin: data.isLogin});
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {isLogin}} = topThis;
        if ('isLogin' in nextProps && nextProps.isLogin !== isLogin) {
            topThis.setState({isLogin: nextProps.isLogin});
        }
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
        return [
            <Row key="0" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-dianhua-yuankuang')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-num-title">客服电话</p>
                    <p className="tool-doubt-content-num">400-820-8820</p>
                </Col>
            </Row>,
            <Row key="1" type="flex" className="tool-doubt-content qq">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-qq')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-num-title">客服QQ</p>
                    <p className="tool-doubt-content-num">738114990</p>
                </Col>
            </Row>,
            <Row key="2" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-youxiang')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-eml-title">客服邮箱</p>
                    <p className="tool-doubt-content-eml">xuke_break@163.com</p>
                </Col>
            </Row>,
            <Row key="3" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={Context.getIconClassName('icon-weixin')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-wx-title">关注我</p>
                    <img className="code" src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
                </Col>
            </Row>
        ]
    }


    /** 工具*/
    renderTool() {
        const topThis = this;
        const {state: {isLogin}} = topThis;
        return <Row className="tool" type="flex" justify="space-between" align="middle"
                    style={{height: 80}}>
            {/*<Col >{topThis.renderLanguageSelect()}</Col>*/}
            {/*<Col lg={0} xl={0}>{topThis.renderButtonNavigation()}</Col>*/}
            <Col className="tool-doubt">
                <Popover placement="bottom" content={this.renderDoubtContent()}>
                    <i className={Context.getIconClassName('icon-zixun')}></i>
                    <span>咨询客服</span>
                </Popover>
            </Col>
            <Col><HeaderSetting member={isLogin}></HeaderSetting></Col>
        </Row>;
    }

    render() {
        const topThis = this;
        const {props: {className, menuTheme}, state: {isLogin}} = topThis;
        return <Row type="flex" className={className ? className + " na-header" : "na-header"}>
            <Col>
                <HeaderLogo></HeaderLogo>
            </Col>
            <Col style={{width: 'calc(100% - 220px)'}}>
                <Row type="flex" align="middle">
                    <Col xs={0} sm={0} md={16} lg={16} xl={16}>
                        <HeaderNavigation type={NavigationType.Default} theme={menuTheme}
                                          member={isLogin}></HeaderNavigation>
                    </Col>
                    <Col xs={0} sm={0} md={8} lg={8} xl={8}>
                        {topThis.renderTool()}
                    </Col>
                </Row>
            </Col>
        </Row>;
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.web.isLogin
    }
}
export default connect(mapStateToProps)(Header);