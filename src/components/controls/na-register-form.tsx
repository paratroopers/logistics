import * as React from "react";
import {Component} from "react";
import {Form, Input, Icon, Checkbox, Button, Select} from 'antd';
import {FormProps} from 'antd/lib/form/Form';
const FormItem = Form.Item;
const SelectOption = Select.Option;

interface RegisterFormControlProps extends FormProps {

}

interface RegisterFormControlStates {

}

class RegisterFormControl extends Component<RegisterFormControlProps, RegisterFormControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}}} = topThis;

        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{width: 70}}>
                <SelectOption value="86">+86</SelectOption>
                <SelectOption value="87">+87</SelectOption>
            </Select>
        );

        return (
            <Form className="page-register-form">
                <FormItem>
                    {getFieldDecorator('PhoneNumber', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input addonBefore={prefixSelector}
                               prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="请输入手机号码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="设置你的登录密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('NextPassword', {
                        rules: [{required: true, message: 'Please input your Password again!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               type="password"
                               placeholder="请再次输入你的密码"/>
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="register-button" style={{width: "100%"}}>
                        同意条款并注册
                    </Button>
                </FormItem>
                <FormItem>
                    <Checkbox>《法律声明和隐私权政策》</Checkbox>
                </FormItem>
            </Form>
        );
    }
}
const RegisterForm = Form.create({})(RegisterFormControl);
export default RegisterForm;