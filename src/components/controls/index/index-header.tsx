import * as React from "react";
import {Component} from "react";
import {Row, Col, Select, Popover} from 'antd';
import {Context} from "../../../util/common";
import {connect} from "react-redux";
import {isBoolean, isNullOrUndefined} from "util";
import {HeaderLogo} from './index-header-logo';
import {HeaderSetting} from './index-header-settings';
import {CustomerserviceDropdown} from '../customerservice/customerservice-dropdown';
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

    /** 工具*/
    renderTool() {
        const topThis = this;
        const {state: {isLogin}} = topThis;
        return <Row className="tool" type="flex" justify="space-between" align="middle"
                    style={{height: 80}}>
            {/*<Col >{topThis.renderLanguageSelect()}</Col>*/}
            {/*<Col lg={0} xl={0}>{topThis.renderButtonNavigation()}</Col>*/}
            <Col className="tool-doubt">
                <Popover placement="bottom" content={<CustomerserviceDropdown></CustomerserviceDropdown>}>
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