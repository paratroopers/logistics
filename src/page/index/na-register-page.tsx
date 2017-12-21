import * as React from "react";
import {Component} from "react";
import {withRouter, Link, hashHistory} from "react-router";
import {PathConfig}from "../../config/pathconfig";
import {Layout, Row, Col, Tabs, Button, Checkbox, Select} from "antd";
import {RegisterEnum}from "../../../src/api/model/common-model";
const {Header, Content, Footer} = Layout;
import {NaGlobal, NaResponse} from '../../util/common';
import {connect} from "react-redux";
import {WebAction} from "../../actions/index";
const {TabPane} = Tabs;
import PhoneRegisterForm from "../../components/controls/na-phone-register-form";
import MailRegisterForm from "../../components/controls/na-mail-register-form";
import {NaNotification} from "../../components/controls/na-notification";
import {RegisterAPI}from "../../api/common-api";
import {GetCodeRequest,RegisterRequest} from "../../api/model/request/common-request";

interface NaRegisterPageProps {
    localeKey?: string;
}

interface NaRegisterPageStates {
    localeKey?: string;
    /** 注册类型*/
    tabKey: string;
}

@withRouter
class NaRegisterPage extends Component<NaRegisterPageProps, NaRegisterPageStates> {
    phoneFromComponent: any;
    mailFromComponent: any;

    constructor(props, context) {
        super(props, context);
        this.state = {
            tabKey: RegisterEnum.phone.toString(),
            localeKey: props.localeKey ? props.localeKey : "zh"
        }
    }

    componentWillReceiveProps(nextProps) {
        const topThis = this;
        const {props: {localeKey}} = topThis;
        if ('localeKey' in nextProps && nextProps.localeKey !== localeKey) {
            topThis.setState({localeKey: nextProps.localeKey});
        }
    }

    onChangeLanguage(key: any) {
        console.log(key);
        NaGlobal.store.dispatch(WebAction.onChangeLanguage(key));
    }

    /** 获取验证码*/
    onClickCode = () => {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        switch (tabKey) {
            case RegisterEnum.phone.toString():
                topThis.phoneFromComponent.props.form.validateFields(["PhoneNumber"],{force:true}, function (err, values) {
                    if (!err) {
                        const request: GetCodeRequest = {
                            tel: values.PhoneNumber,
                            type: RegisterEnum.phone.toString()
                        }
                        topThis.phoneFromComponent.onDownCode();
                        RegisterAPI.GetCode(request).then((data: NaResponse) => {
                            if (data.Data === true) {
                                NaNotification.success({
                                    message: 'Tip',
                                    description: '验证码发送成功!'
                                });
                                /** 锁定按钮*/
                                topThis.phoneFromComponent.onDownCode();
                            }else{
                                NaNotification.error({
                                    message: 'Tip',
                                    description: '验证码发送失败!'
                                });
                            }
                        });
                    }
                });
                break;
            case RegisterEnum.mail.toString():
                topThis.mailFromComponent.props.form.validateFields(["Mail"],{force:true}, function (err, values) {
                    if (!err) {
                        const request: GetCodeRequest = {
                            mail: values.Mail,
                            type: RegisterEnum.phone.toString()
                        }

                        RegisterAPI.GetCode(request).then((data: NaResponse) => {
                            if (data.Data === true) {
                                NaNotification.success({
                                    message: 'Tip',
                                    description: '验证码发送成功!'
                                });
                                /** 锁定按钮*/
                                topThis.mailFromComponent.onDownCode();
                            }else{
                                NaNotification.error({
                                    message: 'Tip',
                                    description: '验证码发送失败!'
                                });
                            }
                        });
                    }
                });
                break;
            default:
                break;
        }
    }

    /** 注册*/
    onClick = () => {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        switch (tabKey) {
            case RegisterEnum.phone.toString():
                topThis.phoneFromComponent.props.form.validateFields({}, function (err, values) {
                    if (!err) {
                        const request: RegisterRequest = {
                            tel: values.PhoneNumber,
                            pwd: values.Password,
                            rePwd: values.NextPassword,
                            code: values.Code
                        }
                        RegisterAPI.Register(request).then((data: NaResponse) => {
                            if (data.Data === true) {
                                NaNotification.success({
                                    message: 'Tip',
                                    description: '注册成功!'
                                });
                            }else
                            {
                                NaNotification.error({
                                    message: 'Tip',
                                    description: '注册失败!'
                                });
                            }
                        });
                    }
                });
                break;
            case RegisterEnum.mail.toString():
                topThis.mailFromComponent.props.form.validateFields({}, function (err, values) {
                    if (!err) {
                        const request: RegisterRequest = {
                            mail: values.Mail,
                            pwd: values.Password,
                            rePwd: values.NextPassword,
                            code: values.Code
                        }
                        RegisterAPI.Register(request).then((data: NaResponse) => {
                            if (data.Data === true) {
                                NaNotification.success({
                                    message: 'Tip',
                                    description: '注册成功!'
                                });
                            }else
                            {
                                NaNotification.error({
                                    message: 'Tip',
                                    description: '注册失败!'
                                });
                            }
                        });
                    }
                });
                break;
            default:
                break;
        }
    }

    render() {
        const topThis = this;
        const {state: {tabKey, localeKey}} = topThis;
        return <Layout className="na-page-register">
            <Header style={{
                background: "#FFF"
            }}>
                <Row type="flex" align="middle" justify="end">
                    <Col>
                        <Select defaultValue={localeKey ? localeKey : "zh"}
                                onChange={topThis.onChangeLanguage.bind(this)}>
                            <Select.Option value="zh">中文</Select.Option>
                            <Select.Option value="en">English</Select.Option>
                        </Select>
                    </Col>
                </Row>
            </Header>
            <Content className="na-page-register-content" style={{minHeight: 'calc(100vh - 80px)', background: "#FFF"}}>
                <Row style={{width: '100%', padding: '0 16px'}}>
                    <Row style={{textAlign: 'center'}}>
                        <div><img onClick={() => {
                            hashHistory.push(PathConfig.HomePage);
                        }} style={{maxWidth: 368, cursor: 'pointer'}} src="http://www.famliytree.cn/icon/logo.png"/>
                        </div>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.45)',
                            marginTop: '12px'
                        }}>为你的境外物流，提供专业优质的服务</p>
                    </Row>
                    <Row style={{maxWidth: 368, margin: '0 auto'}} className="register-tabs">
                        <Tabs size="large" activeKey={tabKey} tabBarStyle={{textAlign: 'center'}} onChange={(key) => {
                            topThis.setState({tabKey: key});
                        }}>
                            <TabPane tab="手机登录" key={RegisterEnum.phone.toString()}>
                                <PhoneRegisterForm
                                    onClickCode={topThis.onClickCode.bind(this)}
                                    wrappedComponentRef={(inst) => topThis.phoneFromComponent = inst}></PhoneRegisterForm>
                            </TabPane>
                            <TabPane tab="邮箱登录" key={RegisterEnum.mail.toString()}>
                                <MailRegisterForm
                                    onClickCode={topThis.onClickCode.bind(this)}
                                    wrappedComponentRef={(inst) => topThis.mailFromComponent = inst}></MailRegisterForm>
                            </TabPane>
                        </Tabs>
                    </Row>
                    <Row style={{maxWidth: 368, margin: '0 auto'}}>
                        <Col span={24}>
                            <Button size="large" type="primary" className="register-button"
                                    onClick={topThis.onClick.bind(this)}
                                    style={{width: "100%", marginBottom: '16px'}}>
                                同意条款并注册
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Checkbox defaultChecked={true}></Checkbox>
                                    <a>《法律声明和隐私权政策》</a>
                                </Col>
                                <Col span={12} style={{textAlign: 'right'}}>
                                    <span>已有账号？ <Link to={PathConfig.LoginPage}>快捷登录 ></Link> </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Content>
        </Layout>
            ;
    }
}

const mapStateToProps = (state) => {
    return {
        localeKey: state.web.languageKey
    }
}
export default connect(mapStateToProps)(NaRegisterPage);