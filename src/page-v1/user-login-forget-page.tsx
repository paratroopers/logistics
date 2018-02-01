import * as React from 'react';
import {Form, Input, Button, Modal, Row, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {Steps} from 'antd-mobile';
import {isNullOrUndefined} from "util";
import {requestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {BaseResponse, Context} from '../util/common';
import {Notification} from "../components-v1/notification";

interface NaLoginForgetProps extends FormComponentProps {
    visible?: boolean;
    onCancel?: () => void;
    /** 验证账号是否存在*/
    validatorAccount?: (value: string, callback) => void;
}

interface NaLoginForgetStates {
    visible?: boolean;
    current?: number;
    countDown?: number;
    /** 验证密码*/
    confirmDirty: boolean;
    loading: boolean;
}


class NaLoginForget extends React.Component<NaLoginForgetProps, NaLoginForgetStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            visible: props.visible ? props.visible : false,
            current: 0,
            countDown: 0,
            confirmDirty: false,
            loading: false
        }
    }

    componentDidMount() {
        this.props.form.resetFields();
        this.setState({loading: false});
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({visible: nextProps.visible, current: 0});
        }
    }

    /* 成功发送Code,验证码60秒等待*/
    setTimeoutPhone = () => {
        const topThis = this;
        setTimeout(function () {
            const {state: {countDown}} = topThis;
            if (countDown !== 0) {
                topThis.setState({countDown: countDown - 1});
                topThis.setTimeoutPhone();
            }
        }, 1000);
    }

    onCancel() {
        const topThis = this;
        const {props: {onCancel}} = topThis;
        if (onCancel) onCancel();
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        const topThis = this;
        const {state: {confirmDirty}} = topThis;
        topThis.setState({confirmDirty: confirmDirty || !!value});
    }

    checkPassword = (rule, value, callback) => {
        const topThis = this;
        const {props: {form}} = topThis;
        if (value && value !== form.getFieldValue('Password')) {
            callback('两次密码输入不一致!');
        } else {
            callback();
        }
    }

    checkConfirm = (rule, value, callback) => {
        const topThis = this;
        const {props: {form}, state: {confirmDirty}} = topThis;
        if (value && confirmDirty) {
            form.validateFields(['NextPassword'], {force: true}, () => {

            });
        }
        callback();
    }

    /** 重置密码*/
    Submit() {
        const topThis = this;
        const {props: {form}} = topThis;
        form.validateFields({}, (err, values) => {
            if (!err) {
                const isMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(values.account);
                /** 发送验证码*/
                const request: requestNameSpace.ForgetRequest = !isMail ? {
                    tel: values.account,
                    pwd: values.Password,
                    code: values.Code
                } : {
                    mail: values.account,
                    pwd: values.Password,
                    code: values.Code
                }
                this.setState({loading: true});
                APINameSpace.LoginApi.Forget(request).then((data: BaseResponse) => {
                    this.setState({loading: false});
                    if (data.Data === true) {
                        Notification.success({
                            message: 'Tip',
                            description: '密码重置成功!'
                        });
                        topThis.onCancel();
                    } else {
                        Context.OpenMessage(data.Status);
                    }
                });
            }
        });
    }

    onCodeOk() {
        const topThis = this;
        const {props: {form}} = topThis;
        form.validateFields(["account"], (err, values) => {
            if (!err) {
                const isMail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(values.account);
                const type = (isMail ? "1" : "0");
                /** 发送验证码*/
                const request: requestNameSpace.GetCodeRequest = !isMail ? {
                    tel: values.account,
                    type: type
                } : {
                    mail: values.account,
                    type: type
                }
                APINameSpace.RegisterAPI.GetCode(request).then((data: BaseResponse) => {
                    if (data.Data === true) {
                        Notification.success({
                            message: 'Tip',
                            description: '验证码发送成功!'
                        });
                        topThis.setState({current: 1, countDown: 60});
                        topThis.setTimeoutPhone();
                    } else {
                        Context.OpenMessage(data.Status);
                    }
                });
            }
        })
    }

    renderSteps(steps?: number) {
        const topThis = this;
        const {props: {validatorAccount}} = topThis;
        const size = 'default';
        const {getFieldDecorator} = this.props.form;
        const {countDown} = this.state;
        let stepsContent: any[] = [];

        stepsContent.push(<Col span={!steps ? 14 : 24}>
            <Form.Item hasFeedback>
                {getFieldDecorator('account', {
                    rules: [{
                        validator: (rule, value, callback) => {
                            if (isNullOrUndefined(value) || value === "") {
                                callback('请正确输入你的账号');
                            } else if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) && !/^1\d{10}$/.test(value)) {
                                callback('请正确输入你的账号');
                            } else {
                                /* 验证账号是否已经存在*/
                                if (validatorAccount) {
                                    validatorAccount(value, (message) => {
                                        callback(message);
                                    });

                                } else {
                                    callback();
                                }
                            }
                        }
                    }]
                })(<Input size={size} placeholder="账号"/>)}
            </Form.Item>
        </Col>);
        stepsContent.push(
            <Col span={steps ? 24 : 0}>
                <Form.Item>
                    {getFieldDecorator('Password', {
                        rules: [{required: true, message: '请输入你的新密码!'}, {
                            validator: topThis.checkConfirm,
                        }]
                    })(<Input size={size} type="password" placeholder="新密码"/>)}
                </Form.Item>
            </Col>
        );
        stepsContent.push(
            <Col span={steps ? 24 : 0}>
                <Form.Item>
                    {getFieldDecorator('NextPassword', {
                        rules: [{required: true, message: '请再次输入你的新密码!'}, {
                            validator: topThis.checkPassword,
                        }]
                    })(<Input size={size} type="password" onBlur={topThis.handleConfirmBlur} placeholder="再次输入新密码"/>)}
                </Form.Item>
            </Col>
        );
        stepsContent.push(<Col span={steps ? 14 : 0}>
            <Form.Item>
                {getFieldDecorator('Code', {
                    rules: [{pattern: /^\d{4}$/, required: true, message: '请正确输入你的验证码'}],
                })(
                    <Input size={size} placeholder="验证码"/>
                )}
            </Form.Item>
        </Col>);
        stepsContent.push(<Col offset={1} span={9}>
            <Form.Item>
                <Button size={size} type="primary" style={{width: '100%'}} onClick={this.onCodeOk.bind(this)}
                        disabled={countDown === 0 ? false : true}>{countDown === 0 ? "获取验证码" : countDown + "秒"}</Button>
            </Form.Item>
        </Col>);
        stepsContent.push(<Col span={steps ? 24 : 0} style={{textAlign: 'center'}}>
            <Form.Item>
                <Button style={{width: '100%'}} size={size} type="primary" loading={this.state.loading}
                        onClick={topThis.Submit.bind(this)}>重设密码</Button>
            </Form.Item>
        </Col>);
        return stepsContent;
    }

    render() {
        return <Modal visible={this.state.visible}
                      className="na-login-content-tabs-modal"
                      width={350}
                      footer={false}
                      onCancel={this.onCancel.bind(this)}>
            <h1 className="title">找回密码</h1>
            <p>验证码将会发送至你的注册邮箱或手机</p>
            <Row align="top" type="flex" justify="start">
                <Col span={24} style={{marginBottom: '14px'}}>
                    <Steps direction="horizontal" size="small" current={this.state.current}>
                        <Steps.Step key="1" description={"获取验证码"}></Steps.Step>
                        <Steps.Step key="2" description={"重置密码"}></Steps.Step>
                    </Steps>
                </Col>
                {
                    <Form style={{width: '100%'}}>
                        {this.renderSteps(this.state.current)}
                    </Form>
                }
            </Row>
        </Modal>
    }
}

export default Form.create<any>()(NaLoginForget);