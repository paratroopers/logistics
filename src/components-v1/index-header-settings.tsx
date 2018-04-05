import * as React from 'react';
import {hashHistory} from 'react-router';
import {connect} from "react-redux";
import {PathConfig} from "../config/pathconfig";
import {Context} from "../util/common";
import {Cookies} from '../util/cookie';
import {Row, Col, Popover, Avatar, Menu, Icon, Modal, Form, Input} from 'antd';
import {HeaderMessage} from './index-header-message';
import {FormComponentProps} from "antd/lib/form";
import {APINameSpace} from "../model/api";
import {ModelNameSpace} from "../model/model";
import {RequestNameSpace} from "../model/request";
import {isNullOrUndefined} from "util";
import HeaderUpdatePwd from "./header-update-password";

interface HeaderSettingProps extends FormComponentProps {
    isLogin?: boolean;
    src?: string;
}

interface HeaderSettingStates {
    isLogin?: boolean;
    isShowModal?: boolean;
    confirmLoading?: boolean;
    src?: string;
}

class HeaderSetting extends React.Component<HeaderSettingProps, HeaderSettingStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLogin: props.isLogin ? props.isLogin : false,
            isShowModal: false,
            confirmLoading: false,
            src: props.src ? props.src : "http://www.famliytree.cn/icon/timor.png",
        }
    }

    componentDidMount() {
        const topThis = this;
        /** 更新用户信息*/
        let userModel: ModelNameSpace.UserModel = JSON.parse(window.localStorage.getItem('UserInfo'));
        if (!isNullOrUndefined(userModel) && userModel.userInfo.HeaderURL !== "" && userModel.userInfo.HeaderURL !== null) {
            topThis.setState({src: userModel.userInfo.HeaderURL});
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {isLogin, src}} = topThis;
        if ('isLogin' in nextProps && nextProps.isLogin !== isLogin) {
            topThis.setState({isLogin: nextProps.isLogin});
        }
        if ('src' in nextProps && nextProps.src !== src) {
            topThis.setState({src: nextProps.src !== "" && nextProps.src !== null ? nextProps.src : "http://www.famliytree.cn/icon/timor.png"});
        }
    }

    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        switch (key) {
            case "0":
                hashHistory.push({pathname: PathConfig.MemberIndexPage});
                topThis.setState({isShowModal: true});
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
                <Icon type="unlock"/>
                <span>修改密码</span>
            </Menu.Item>

            <Menu.Divider></Menu.Divider>
            <Menu.Item key="2">
                <Icon type="poweroff"/>
                <span>退出</span>
            </Menu.Item>
        </Menu>;
    }

    render() {
        const topThis = this;
        const {state: {src, isLogin}} = topThis;
        if (!isLogin) return <div></div>;
        try {
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
                            <Avatar style={{marginRight: 5}} src={src}/>
                            <span>{userName}</span>
                        </a>
                    </Popover>
                </Col>
               <HeaderUpdatePwd visible={this.state.isShowModal} onCancel={()=>this.setState({isShowModal:false})}></HeaderUpdatePwd>
            </Row>
        } catch (ex) {
            return null;
        }
    }
}
const mapStateToProps = (state) => {
    return {
        src: state.web.avatarUrl
    }
}
export default connect(mapStateToProps)(Form.create<any>()(HeaderSetting));