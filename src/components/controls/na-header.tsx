import * as React from "react";
import {Component} from "react";
import {hashHistory} from 'react-router';
import {Row, Col, Menu, Select, Popover, Avatar, Icon} from 'antd';
import {NaGlobal, NaContext} from "../../util/common";
import {CommonLocale} from "../../locales/localeid";
import {PathConfig} from "../../config/pathconfig";
import {connect} from "react-redux";
import {Cookies} from '../../util/cookie';
import {isBoolean, isNullOrUndefined} from "util";

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
    /** 是否已经登录*/
    isLogin?: boolean;
}

interface NaHeaderStates {
    /** 是否已经登录*/
    isLogin: boolean;
}

class NaHeader extends Component<NaHeaderProps, NaHeaderStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: props.isLogin ? props.isLogin : false
        }
    }

    componentDidMount() {
        const topThis = this;
        const data = NaContext.getMerchantData();
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

    /** User setting*/
    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        const {state: {isLogin}} = topThis;
        switch (key) {
            case "0":
                hashHistory.push({pathname: PathConfig.VIPCenterPage});
                break;
            case "2":
                NaContext.setMerchantData({isLogin: false});
                hashHistory.push({pathname: PathConfig.HomePage});
                topThis.setState({isLogin: false});
                Cookies.remove("Authorization");
                break;
            default:
                break;
        }
    }

    onClickNavigation({item, key, keyPath}) {
        const topThis = this;
        const {state: {isLogin}} = topThis;
        switch (key) {
            case PathConfig.VIPCenterPage:
                if (isLogin === true) {
                    hashHistory.push({pathname: PathConfig.VIPCenterPage});
                } else {
                    hashHistory.push({pathname: PathConfig.LoginPage});
                }
                break;
            default:
                hashHistory.push({pathname: key});
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
                  onClick={topThis.onClickNavigation.bind(this)}
            >
                <Menu.Item key={PathConfig.HomePage}>{formatMessage({id: CommonLocale.HeaderMenuHome})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.CostEstimatePage}>{formatMessage({id: CommonLocale.HeaderMenuCostEstimate})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.CompanyProfilePage}>{formatMessage({id: CommonLocale.HeaderMenuCompanyProfile})}</Menu.Item>
                <Menu.Item
                    key={PathConfig.VIPCenterPage}>{formatMessage({id: CommonLocale.HeaderMenuVIPCenter})}</Menu.Item>
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
        return [
            <Row key="0" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={NaContext.getIconClassName('icon-dianhua-yuankuang')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-num-title">客服电话</p>
                    <p className="tool-doubt-content-num">400-820-8820</p>
                </Col>
            </Row>,
            <Row key="1" type="flex" className="tool-doubt-content qq">
                <Col span={6}>
                    <i className={NaContext.getIconClassName('icon-qq')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-num-title">客服QQ</p>
                    <p className="tool-doubt-content-num">738114990</p>
                </Col>
            </Row>,
            <Row key="2" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={NaContext.getIconClassName('icon-youxiang')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-eml-title">客服邮箱</p>
                    <p className="tool-doubt-content-eml">xuke_break@163.com</p>
                </Col>
            </Row>,
            <Row key="3" type="flex" className="tool-doubt-content">
                <Col span={6}>
                    <i className={NaContext.getIconClassName('icon-weixin')}></i>
                </Col>
                <Col span={18} className="title">
                    <p className="tool-doubt-content-wx-title">关注我</p>
                    <img className="code" src="http://www.famliytree.cn/icon/wx_ewm.jpg"/>
                </Col>
            </Row>
        ]
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
        </Row> : null;
    }

    /** 工具*/
    renderTool() {
        const topThis = this;
        return <Row className="tool" type="flex" justify="space-between" align="middle"
                    style={{height: 80}}>
            {/*<Col >{topThis.renderLanguageSelect()}</Col>*/}
            {/*<Col className="tool-tel">*/}
            {/*<i className={NaContext.getIconClassName('icon-dianhua')}></i>*/}
            {/*<span>400-820-8820</span>*/}
            {/*</Col>*/}
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
        return <Row type="flex" className={className ? className + " na-header" : "na-header"}>
            <Col>
                <a className="logo" onClick={topThis.onClickLogo.bind(this)}>
                    {typeof logo === "string" ? <img onClick={() => {
                        hashHistory.push(PathConfig.HomePage);
                    }} src={logo}></img> : logo}
                </a>
            </Col>
            <Col style={{width: 'calc(100% - 220px)'}}>
                <Row type="flex" align="middle">
                    <Col xs={0} sm={0} md={0} lg={16} xl={16}>
                        {topThis.renderNavigation()}
                    </Col>
                    <Col xs={0} sm={0} md={24} lg={8} xl={8}>
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
export default connect(mapStateToProps)(NaHeader);