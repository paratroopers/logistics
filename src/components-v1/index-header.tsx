import * as React from "react";
import {Component} from "react";
import {Row, Col, Select, Popover} from 'antd';
import {Context} from "../util/common";
import {connect} from "react-redux";
import {isNullOrUndefined} from "util";
import {HeaderLogo} from './index-header-logo';
import HeaderSetting from './index-header-settings';
import {ContactCustomerService} from './customer-service-dropdown';
import {HeaderNavigation, NavigationType} from './index-header-navigation';

interface HeaderProps {
    /** na-header 同级样式*/
    className?: string;
    logo?: string | React.ReactNode;
    /* Menu Theme*/
    menuTheme?: "light" | "dark";
    /* 语言选项发生改变*/
    onChangeLanguage?: (key: any) => void;
    /* 默认语言*/
    defaultLanguageKey?: string;
}

interface HeaderStates {
}

export default class Header extends Component<HeaderProps, HeaderStates> {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        if (isNullOrUndefined(Context.getMerchantData()) || isNullOrUndefined(Context.getToken())) {

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
        return <Row className="tool" type="flex" justify="space-between" align="middle"
                    style={{height: 80}}>
            <Col className="tool-doubt">
                <Popover placement="bottom" content={<ContactCustomerService></ContactCustomerService>}>
                    <i className={Context.getIconClassName('icon-zixun')}></i>
                    <span>咨询客服</span>
                </Popover>
            </Col>
            <Col>{Context.getLoginStatus() ? <HeaderSetting></HeaderSetting> : null}</Col>
        </Row>;
    }

    render() {
        const topThis = this;
        const {props: {className, menuTheme}} = topThis;
        return <Row type="flex" className={className ? className + " na-header" : "na-header"}>
            <Col>
                <HeaderLogo></HeaderLogo>
            </Col>
            <Col style={{width: 'calc(100% - 252px)'}}>
                <Row type="flex" align="middle">
                    <Col xs={0} sm={0} md={0} lg={16} xl={16}>
                        <HeaderNavigation type={NavigationType.Default} theme={menuTheme}></HeaderNavigation>
                    </Col>
                    <Col xs={0} sm={0} md={10} lg={0} xl={0}>
                    </Col>
                    <Col xs={0} sm={0} md={14} lg={8} xl={8}>
                        {topThis.renderTool()}
                    </Col>
                </Row>
            </Col>
        </Row>;
    }
}