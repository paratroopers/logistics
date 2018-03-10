import * as React from "react";
import {Component} from "react";
import {withRouter, Link, hashHistory} from "react-router";
import {PathConfig}from "../config/pathconfig";
import {Layout, Row, Col, Tabs, Button, Checkbox, Select, Icon, Form, Modal} from "antd";
import {Global, BaseResponse, Context} from '../util/common';
import {connect} from "react-redux";
import {WebAction} from "../actions/index";
import UserRegisterEmail from "../components-v1/user-register-email";
import UserRegisterPhone from "../components-v1/user-register-phone";
import {Notification} from "../components-v1/notification";
import {requestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
const {Header, Content, Footer} = Layout;
const {TabPane} = Tabs;

const FormItem = Form.Item;

interface UserRegisterPageProps {
    localeKey?: string;
}

interface UserRegisterPageStates {
    localeKey?: string;
    /** 注册类型*/
    tabKey: string;
    /** 是否注册成功*/
    visibleSuccess: boolean;
    /** 是否勾选法律声明*/
    isCheckBox: boolean;
}

@withRouter
class UserRegisterPage extends Component<UserRegisterPageProps, UserRegisterPageStates> {
    phoneFromComponent: any;
    mailFromComponent: any;
    /* 验证账号的Timeout*/
    timeout: any;
    /* 验证账号的value*/
    currentValue: string;

    constructor(props, context) {
        super(props, context);
        this.state = {
            tabKey: ModelNameSpace.RegisterEnum.phone.toString(),
            localeKey: props.localeKey ? props.localeKey : "zh",
            visibleSuccess: false,
            isCheckBox: true
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
        Global.store.dispatch(WebAction.onChangeLanguage(key));
    }

    /** 账号是否存在*/
    validatorAccount = (value: string, callback) => {
        const topThis = this;
        const {timeout} = topThis;
        if (timeout) {
            clearTimeout(timeout);
            topThis.timeout = null;
        }
        topThis.currentValue = value;

        topThis.timeout = setTimeout(function () {
            const request: requestNameSpace.AccountValidateRequest = {
                user: value
            };
            APINameSpace.RegisterAPI.AccountValidate(request).then((result: BaseResponse) => {
                if (result.Data === true) {
                    callback();
                } else {
                    /* 该账号已经被注册*/
                    callback("该账号已经被注册!");
                }
            })
        }, 1000);
    }

    /** 获取验证码*/
    onClickCode = () => {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        switch (tabKey) {
            case ModelNameSpace.RegisterEnum.phone.toString():
                topThis.phoneFromComponent.props.form.validateFields(["PhoneNumber"], {force: true}, function (err, values) {
                    if (!err) {
                        const request: requestNameSpace.GetCodeRequest = {
                            tel: values.PhoneNumber,
                            type: ModelNameSpace.RegisterEnum.phone.toString()
                        }
                        topThis.phoneFromComponent.onDownCode();
                        APINameSpace.RegisterAPI.GetCode(request).then((data: BaseResponse) => {
                            if (data.Data === true) {
                                Notification.success({
                                    message: 'Tip',
                                    description: '验证码发送成功!'
                                });
                                /** 锁定按钮*/
                                topThis.phoneFromComponent.onDownCode();
                            } else {
                                Context.OpenMessage(data.Status);
                            }
                        });
                    }
                });
                break;
            case ModelNameSpace.RegisterEnum.mail.toString():
                topThis.mailFromComponent.props.form.validateFields(["Mail"], {force: true}, function (err, values) {
                    if (!err) {
                        const request: requestNameSpace.GetCodeRequest = {
                            mail: values.Mail,
                            type: ModelNameSpace.RegisterEnum.mail.toString()
                        }

                        APINameSpace.RegisterAPI.GetCode(request).then((data: BaseResponse) => {
                            if (data.Data === true) {
                                Notification.success({
                                    message: 'Tip',
                                    description: '验证码发送成功!'
                                });
                                /** 锁定按钮*/
                                topThis.mailFromComponent.onDownCode();
                            } else {
                                Context.OpenMessage(data.Status);
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
        const {state: {tabKey, isCheckBox}} = topThis;

        switch (tabKey) {
            case ModelNameSpace.RegisterEnum.phone.toString():
                topThis.phoneFromComponent.props.form.validateFields({}, function (err, values) {

                    /** 是否勾选法律声明*/
                    if (!isCheckBox) {
                        Notification.warning({
                            message: '提示',
                            description: '请勾选同意法律声明!'
                        });
                        return;
                    } else if (!err) {
                        const request: requestNameSpace.RegisterRequest = {
                            tel: values.PhoneNumber,
                            pwd: values.Password,
                            rePwd: values.NextPassword,
                            code: values.Code
                        }
                        APINameSpace.RegisterAPI.Register(request).then((data: BaseResponse) => {
                            if (data.Data === true) {
                                Notification.success({
                                    message: 'Tip',
                                    description: '注册成功!'
                                });
                                topThis.setState({visibleSuccess: true});
                            } else {
                                Context.OpenMessage(data.Status);
                            }
                        });
                    }
                });
                break;
            case ModelNameSpace.RegisterEnum.mail.toString():
                topThis.mailFromComponent.props.form.validateFields({}, function (err, values) {
                    /** 是否勾选法律声明*/
                    if (!isCheckBox) {
                        Notification.warning({
                            message: '提示',
                            description: '请勾选同意法律声明!'
                        });
                        return;
                    } else if (!err) {
                        const request: requestNameSpace.RegisterRequest = {
                            mail: values.Mail,
                            pwd: values.Password,
                            rePwd: values.NextPassword,
                            code: values.Code
                        }
                        APINameSpace.RegisterAPI.Register(request).then((data: BaseResponse) => {
                            if (data.Data === true) {
                                Notification.success({
                                    message: 'Tip',
                                    description: '注册成功!'
                                });
                                topThis.setState({visibleSuccess: true});
                            } else {
                                Context.OpenMessage(data.Status);
                            }
                        });
                    }
                });
                break;
            default:
                break;
        }
    }

    /** 显示法律声明*/
    onClickCheck() {
        Modal.info({
            width: 600,
            title: '《本站法律声明和隐私权政策》',
            okText: '关闭',
            content: (
                <div style={{whiteSpace: 'pre-line'}}>
                    <p>欢迎您注册成为本网站会员。在注册前请您仔细阅读以下条款：</p>
                    <p>在您注册成为本网站会员时，即同意本公司协议，本协议具有合同效力。</p>
                    <p>注册成为本站会员，你将得到一个密码和帐号。请妥善保管您的用户名和密码，如因会员自己泄露，会员个人将负全部责任。如若发现任何会员帐号异常或有安全漏洞的情况，请立即告知我们，我们会在最短的时间内为您解决后顾之忧。</p>
                    <p>会员在网站不得发布危害国家信息安全、迷信、谣言、色情、暴力等危害社会稳定的信息，不得发布危害本站利益的信息，一经发现将终止会员服务，情节严重的交司法机关处理。</p>
                    <p>大陆国际物流网，尊重并保护所有使用服务用户的个人隐私权。在未征得您事先许可的情况下，我们不会将这些信息对外披露或向第三方提供。我们会定期更新本隐私权政策。 在您成功注册本网站会员时，即视为您已经同意本隐私权政策全部内容。</p>
                    <p>免责声明，本站为仓储物流供应链中间商，负责接收货物，免费仓储，拍照，理货，合并打包，提供物流渠道和优惠折扣物流价格，代理报关，出运等。本站非物流承运商，运输途中一旦发生快件破损、延误、丢失，等情况我们将竭尽全力协助您与承运商之间办理查询、索赔等事宜，赔偿细则按承运商规定为准。我们合作的承运商有知名国际快递公司dhl、ups、tnt、fedex、EMS、aramex、DPEX和航空公司等.同时客户需详细了解国际空运货物禁寄物品与限制物品，如液体，粉末，强磁性，危险化工品，刀具类，武器类，食品类，野生动植物类，生鲜活物类，等等航空管制的物品，我司不予接纳。</p>
                    <p>我司会员仓库免费为客户开通，存进仓库的货物免费为会员存储365天，超过免费存储期限的货物，我司将作为废品处理，不再另行通知。</p>
                    <p>本网站信息服务条款要与中华人民共和国的法律解释一致。用户和本网站一致同意服从本网站所在地有管辖权的法院管辖。如发生本网站服务条款与中华人民共和国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它条款则依旧保持对用户的约束力</p>
                </div>
            ),
            onOk() {
            },
        });
    }

    renderSuccess() {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        let account = "";
        switch (tabKey) {
            case ModelNameSpace.RegisterEnum.phone.toString():
                account = topThis.phoneFromComponent.props.form.getFieldValue("Phone");
                break;
            case ModelNameSpace.RegisterEnum.mail.toString():
                account = topThis.mailFromComponent.props.form.getFieldValue("Mail");
                break;
        }

        /** 5秒跳转登录页面*/
        const time = setTimeout(() => {
            hashHistory.push(PathConfig.LoginPage);
        }, 5000);

        return <Row style={{textAlign: 'center', maxWidth: 368, margin: '0 auto'}}>
            <div style={{margin: '40px auto'}}>
                <Icon style={{fontSize: '72px', color: "#e65922"}} type="check-circle"/>
            </div>
            <h2>你的账户：{account} 注册成功</h2>
            <p style={{
                fontSize: '14px',
                color: 'rgba(0, 0, 0, 0.45)',
                marginTop: '12px'
            }}>5秒后跳转登录页面</p>
            <Button size="large" type="primary" className="register-button"
                    onClick={() => {
                        clearTimeout(time);
                    }}
                    style={{width: "100%", marginTop: '40px',}}>
                <Link to={PathConfig.LoginPage}>快捷登录 ></Link>
            </Button>
        </Row>;
    }

    render() {
        const topThis = this;
        const {state: {tabKey, localeKey, visibleSuccess, isCheckBox}} = topThis;
        return <Layout className="na-page-register">
            <Header className="na-page-register-header" style={{
                background: "#FFF"
            }}>
                <Row className="header-back-home" type="flex" align="middle" justify="end">
                    <Col xs={12} sm={24} md={0} lg={0} xl={0}>
                        <Link style={{color: '#FFFFFF'}} to={PathConfig.HomePage}>{"< 返回首页"}</Link>
                    </Col>
                    <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'right'}}>
                        <Link to={PathConfig.HomePage}>{"返回首页 >"}</Link>
                    </Col>
                    <Col xs={12} sm={0} md={0} lg={0} xl={0} style={{textAlign: 'right'}}>
                        <Link style={{color: '#FFFFFF'}} to={PathConfig.LoginPage}>快捷登录 ></Link>
                    </Col>
                </Row>
            </Header>
            <Content className="na-page-register-content" style={{minHeight: 'calc(100vh - 80px)', background: "#FFF"}}>
                <Row style={{width: '100%', padding: '0 16px'}}>
                    <Row style={{textAlign: 'center'}}>
                        <div><img onClick={() => {
                            hashHistory.push(PathConfig.HomePage);
                        }} style={{maxWidth: 368, cursor: 'pointer', width: '100%'}}
                                  src="http://www.famliytree.cn/icon/logo.png"/>
                        </div>
                        <p className="logo-content" style={{
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.45)',
                            marginTop: '12px'
                        }}>为你的境外物流，提供专业优质的服务</p>
                    </Row>
                    {visibleSuccess === true ? topThis.renderSuccess() : null}
                    {visibleSuccess === true ? null :
                        <Row style={{maxWidth: 368, margin: '0 auto'}} className="register-tabs">
                            <Tabs size="large" activeKey={tabKey} tabBarStyle={{textAlign: 'center'}}
                                  onChange={(key) => {
                                      topThis.setState({tabKey: key});
                                  }}>
                                <TabPane tab="手机注册" key={ModelNameSpace.RegisterEnum.phone.toString()}>
                                    <UserRegisterPhone
                                        validatorAccount={topThis.validatorAccount.bind(this)}
                                        onClickCode={topThis.onClickCode.bind(this)}
                                        wrappedComponentRef={(inst) => topThis.phoneFromComponent = inst}></UserRegisterPhone>
                                </TabPane>
                                <TabPane tab="邮箱注册" key={ModelNameSpace.RegisterEnum.mail.toString()}>
                                    <UserRegisterEmail
                                        validatorAccount={topThis.validatorAccount.bind(this)}
                                        onClickCode={topThis.onClickCode.bind(this)}
                                        wrappedComponentRef={(inst) => topThis.mailFromComponent = inst}></UserRegisterEmail>
                                </TabPane>
                            </Tabs>
                        </Row>}
                    {visibleSuccess === true ? null : <Row style={{maxWidth: 368, margin: '0 auto'}}>
                        <Col span={24}>
                            <Button size="large" type="primary" className="register-button"
                                    onClick={topThis.onClick.bind(this)}
                                    style={{width: "100%", marginBottom: '16px'}}>
                                同意条款并注册
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Form>
                                <Col xs={24} sm={12}>
                                    <FormItem
                                        validateStatus={isCheckBox ? "success" : "error"}
                                        help={isCheckBox ? "" : "请勾选同意此声明"}
                                    >
                                        <Checkbox checked={isCheckBox} onChange={(e) => {
                                            topThis.setState({isCheckBox: e.target.checked});
                                        }}></Checkbox><a onClick={topThis.onClickCheck.bind(this)}>《法律声明和隐私权政策》</a>
                                    </FormItem>
                                </Col>
                                <Col xs={0} sm={12} style={{textAlign: 'right'}}>
                                    <FormItem>
                                        <span>已有账号？ <Link to={PathConfig.LoginPage}>快捷登录 ></Link> </span>
                                    </FormItem>
                                </Col>
                            </Form>
                        </Col>
                    </Row>}
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
export default connect(mapStateToProps)(UserRegisterPage);