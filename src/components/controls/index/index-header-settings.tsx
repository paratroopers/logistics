import * as React from 'react';
import {hashHistory} from 'react-router';
import {PathConfig} from "../../../config/pathconfig";
import {Context} from "../../../util/common";
import {Cookies} from '../../../util/cookie';
import {Row, Col, Popover, Avatar, Menu, Icon} from 'antd';
import {HeaderMessage} from './index-header-message';

interface HeaderSettingProps {
    isLogin?: boolean;
}

interface HeaderSettingStates {
    isLogin?: boolean;
}

export class HeaderSetting extends React.Component<HeaderSettingProps, HeaderSettingStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: props.isLogin ? props.isLogin : false
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {isLogin}} = topThis;
        if ('isLogin' in nextProps && nextProps.isLogin !== isLogin) {
            topThis.setState({isLogin: nextProps.isLogin});
        }
    }

    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        switch (key) {
            case "0":
                hashHistory.push({pathname: PathConfig.MemberIndexPage});
                break;
            case "2":
                Context.setMerchantData({isLogin: false});
                hashHistory.push({pathname: PathConfig.LoginPage});
                topThis.setState({isLogin: false});
                Cookies.remove("Authorization");

                // MememberAPI.LoginOut().then(result =>{
                //     if (result.Data == "True")
                //     {
                //
                //     }
                // });

                break;
            default:
                break;
        }
    }

    renderUserNameContent() {
        return <Menu onClick={this.onClickUserMenu.bind(this)}>
            <Menu.Item key="0">
                <Icon type="user"/>
                <span>个人信息</span>
            </Menu.Item>

            <Menu.Divider></Menu.Divider>
            <Menu.Item key="2">
                <Icon type="poweroff"/>
                <span>退出</span>
            </Menu.Item>
        </Menu>;
    }

    render() {
        if (!this.state.isLogin) return <div></div>;
        const userName = Context.getCurrentUser().userInfo.MemeberCode;
        return <Row className="tool-user" type="flex" align="middle" justify="start">
            <Col className="tool-user-message">
                <HeaderMessage></HeaderMessage>
            </Col>
            <Col className="tool-user-right">
                <Popover placement="bottomRight"
                         overlayClassName="tool-user-popover"
                         autoAdjustOverflow={true}
                         content={this.renderUserNameContent()}
                         trigger="click">
                    <a className="tool-user-right-name">
                        <Avatar style={{marginRight: 5}} src="http://www.famliytree.cn/icon/timor.png"/>
                        <span>{userName}</span>
                    </a>
                </Popover>
                {/*{member && <Popover placement="bottomRight"*/}
                {/*overlayClassName="tool-user-popover"*/}
                {/*autoAdjustOverflow={true}*/}
                {/*content={this.renderUserNameContent()}*/}
                {/*trigger="click">*/}
                {/*<a className="tool-user-right-name">*/}
                {/*<Avatar style={{marginRight: 5}} src="http://www.famliytree.cn/icon/timor.png"/>*/}
                {/*Handy*/}
                {/*</a>*/}
                {/*</Popover>}*/}
            </Col>
        </Row>
    }
}