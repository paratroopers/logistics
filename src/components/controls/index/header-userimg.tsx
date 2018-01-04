import * as React from 'react';
import {hashHistory} from 'react-router';
import {PathConfig} from "../../../config/pathconfig";
import {NaContext} from "../../../util/common";
import {Cookies} from '../../../util/cookie';
import {Row, Col, Popover, Avatar, Menu, Icon} from 'antd';

interface HeaderUserimgProps {
    member?: boolean;
}

interface HeaderUserimgStates {

}

export class HeaderUserimg extends React.Component<HeaderUserimgProps, HeaderUserimgStates> {
    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        const {props: {member}} = topThis;
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

    renderUserNameContent() {
        return <Menu onClick={this.onClickUserMenu.bind(this)}>
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
                <span>退出</span>
            </Menu.Item>
        </Menu>;
    }

    render() {
        return <Row className="tool-user">
            <Col></Col>
            <Col className="tool-user-right">
                <Popover placement="bottomRight"
                         overlayClassName="tool-user-popover"
                         autoAdjustOverflow={true}
                         content={this.renderUserNameContent()}
                         trigger="click">
                    <a className="tool-user-right-name">
                        <Avatar style={{marginRight: 5}} src="http://www.famliytree.cn/icon/timor.png"/>
                        Handy
                    </a>
                </Popover>
            </Col>
        </Row>
    }
}