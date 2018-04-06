import * as React from 'react';
import {hashHistory} from 'react-router';
import {connect} from "react-redux";
import {PathConfig} from "../config/pathconfig";
import {Context} from "../util/common";
import {Row, Col, Popover, Avatar, Menu, Icon, Form} from 'antd';
import {HeaderMessage} from './index-header-message';
import {FormComponentProps} from "antd/lib/form";
import {ModelNameSpace} from "../model/model";
import {isNullOrUndefined} from "util";
import HeaderUpdatePwd from "./header-update-password";

interface HeaderSettingProps extends FormComponentProps {
    src?: string;
}

interface HeaderSettingStates {
    isShowModal?: boolean;
    confirmLoading?: boolean;
    src?: string;
}

class HeaderSetting extends React.Component<HeaderSettingProps, HeaderSettingStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isShowModal: false,
            confirmLoading: false,
            src: props.src ? props.src : "http://www.famliytree.cn/icon/timor.png",
        }
    }

    componentDidMount() {
        const topThis = this;
        /** 初始化用不信息设置头像*/
        let userModel: ModelNameSpace.UserModel = Context.getMerchantData();
        if (!isNullOrUndefined(userModel) && userModel.userInfo.HeaderURL !== "" && userModel.userInfo.HeaderURL !== null) {
            topThis.setState({src: userModel.userInfo.HeaderURL});
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {src}} = topThis;
        if ('src' in nextProps && nextProps.src !== src) {
            topThis.setState({src: nextProps.src !== "" && nextProps.src !== null ? nextProps.src : "http://www.famliytree.cn/icon/timor.png"});
        }
    }

    onClickUserMenu({item, key, keyPath}) {
        const topThis = this;
        switch (key) {
            case "changePassword":
                topThis.setState({isShowModal: true});
                break;
            case "logOut":
                Context.setMerchantData(null);
                Context.setToken(null);
                hashHistory.push({pathname: PathConfig.LoginPage});
                break;
            default:
                break;
        }
    }

    renderUserNameContent() {
        const topThis = this;
        return <Menu onClick={topThis.onClickUserMenu.bind(this)}>
            <Menu.Item key="changePassword">
                <Icon type="unlock"/>
                <span>修改密码</span>
            </Menu.Item>
            <Menu.Divider></Menu.Divider>
            <Menu.Item key="logOut">
                <Icon type="poweroff"/>
                <span>退出</span>
            </Menu.Item>
        </Menu>;
    }

    render() {
        const topThis = this;
        const {state: {src}} = topThis;
        try {
            const userName = Context.getMerchantData().userInfo.MemeberCode;
            return <Row className="tool-user" type="flex" align="middle" justify="start">
                <Col className="tool-user-message">
                    <HeaderMessage></HeaderMessage>
                </Col>
                <Col className="tool-user-right">
                    <Popover placement="bottomRight"
                             overlayClassName="tool-user-popover"
                             autoAdjustOverflow={true}
                             content={topThis.renderUserNameContent()}
                             trigger="click">
                        <a className="tool-user-right-name">
                            <Avatar style={{marginRight: 5}} src={src}/>
                            <span>{userName}</span>
                        </a>
                    </Popover>
                </Col>
                <HeaderUpdatePwd visible={topThis.state.isShowModal}
                                 onCancel={() => topThis.setState({isShowModal: false})}></HeaderUpdatePwd>
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