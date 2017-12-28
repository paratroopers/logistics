import * as React from "react";
import {Component} from "react";
import {Form, Input, Icon, Button, Row, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {isNullOrUndefined} from "util";
const FormItem = Form.Item;

interface MailRegisterFormControlProps extends FormComponentProps {
    onClickCode?: React.FormEventHandler<any>;
    /** 验证账号是否已经存在*/
    validatorAccount?: (value:string,callback) => void;
}

interface MailRegisterFormControlStates {
    /** 验证码禁用倒计时*/
    countDown: number;
    /** 验证密码*/
    confirmDirty:boolean;
}

class MailRegisterFormControl extends Component<MailRegisterFormControlProps, MailRegisterFormControlStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            countDown: 0,
            confirmDirty:false
        }
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        const topThis = this;
        const {state:{confirmDirty}}=topThis;
        topThis.setState({ confirmDirty: confirmDirty || !!value });
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
        const {props: {form},state:{confirmDirty}} = topThis;
        if (value && confirmDirty) {
            form.validateFields(['NextPassword'], { force: true },()=>{

            });
        }
        callback();
    }

    /** 验证码倒计时*/
    onDownCode() {
        const topThis = this;
        topThis.setState({countDown: 60});
        topThis.setTimeoutPhone();
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

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator},onClickCode,validatorAccount}, state: {countDown}} = topThis;

        return (
            <Form className="na-page-register-form">
                <FormItem hasFeedback>
                    {getFieldDecorator('Mail', {
                        rules: [{
                            validator:(rule, value, callback)=>{
                            if(isNullOrUndefined(value)||value===""){
                                callback('请正确输入你的邮箱!');
                            }else if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                                callback('请正确输入你的邮箱!');
                            }else {
                                /* 验证账号是否已经存在*/
                                if(validatorAccount)
                                {
                                    validatorAccount(value,(message)=>{
                                        callback(message);
                                    });

                                }else
                                {
                                    callback();
                                }
                            }
                        }}],
                    })(
                        <Input size="large" prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="邮箱"/>
                    )}
                </FormItem>
                <FormItem>
                    <Row style={{margin: '0 -4px'}}>
                        <Col span={16} style={{padding: '0 4px'}}>
                            {getFieldDecorator('Code', {
                                rules: [{required: true, message: '请输入你的邮箱验证码!'}],
                            })(
                                <Input prefix={<Icon type="barcode" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       size="large"
                                       placeholder="验证码"/>
                            )}
                        </Col>
                        <Col span={8} style={{padding: '0 4px'}}>
                            <Button size="large" type="primary" style={{width: '100%'}}
                                    disabled={countDown === 0 ? false : true}
                                    onClick={onClickCode}>{countDown === 0 ? "获取验证码" : countDown + "秒"}</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Password', {
                        rules: [{required: true, message: '请输入你的登录密码!'}, {
                            validator: topThis.checkConfirm,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               size="large"
                               type="password"
                               placeholder="登录密码"/>
                    )}

                </FormItem>
                <FormItem>
                    {getFieldDecorator('NextPassword', {
                        rules: [{required: true, message: '请再次输入你的密码!'}, {
                            validator: topThis.checkPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               size="large"
                               type="password"
                               onBlur={topThis.handleConfirmBlur}
                               placeholder="再次输入密码"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
const MailRegisterForm = Form.create<any>()(MailRegisterFormControl);
export default MailRegisterForm;