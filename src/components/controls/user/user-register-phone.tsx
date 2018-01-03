import * as React from "react";
import {Component} from "react";
import {Form, Input, Icon, Button, Select, Row, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {isNullOrUndefined} from "util";
const FormItem = Form.Item;
const SelectOption = Select.Option;

export interface UserRegisterPhoneProps extends FormComponentProps {
    onClickCode?: React.FormEventHandler<any>;
    /** 验证账号是否已经存在*/
    validatorAccount?: (value:string,callback) => void;
}

export interface UserRegisterPhoneStates {
    /** 验证码禁用倒计时*/
    countDown: number;
    /** 验证密码*/
    confirmDirty:boolean;
}

class UserRegisterPhone extends Component<UserRegisterPhoneProps, UserRegisterPhoneStates> {
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
        const {props: {form: {getFieldDecorator}, onClickCode,validatorAccount}, state: {countDown}} = topThis;

        const prefixSelector = getFieldDecorator('PhonePrefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <SelectOption value="86">+86</SelectOption>
                <SelectOption value="87">+87</SelectOption>
            </Select>
        );
        return (
            <Form className="na-page-register-form">
                <FormItem hasFeedback>
                    {getFieldDecorator('PhoneNumber', {
                        rules: [{
                            validator:(rule, value, callback)=>{
                                if(isNullOrUndefined(value)||value===""){
                                    callback('请正确输入你的手机号码!');
                                }else if(!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value)) {
                                    callback('请正确输入你的手机号码!');
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
                            }
                        }],
                    })(
                        <Input addonBefore={prefixSelector}
                               size="large"
                               prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="手机号码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Row style={{margin: '0 -4px'}}>
                        <Col span={16} style={{padding: '0 4px'}}>
                            {getFieldDecorator('Code', {
                                rules: [{pattern:/^\d{4}$/,required: true, message: '请正确输入你的手机验证码!'}],
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
                               type="password"
                               size="large"
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
                               type="password"
                               size="large"
                               onBlur={topThis.handleConfirmBlur}
                               placeholder="再次输入密码"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
export default Form.create<any>()(UserRegisterPhone);