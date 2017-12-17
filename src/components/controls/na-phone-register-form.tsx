import * as React from "react";
import {Component} from "react";
import {Form, Input, Icon, Checkbox, Button, Select,Row,Col} from 'antd';
import {FormProps} from 'antd/lib/form/Form';
const FormItem = Form.Item;
const SelectOption = Select.Option;

interface PhoneRegisterFormControlProps extends FormProps {

}

interface PhoneRegisterFormControlStates {

}

class PhoneRegisterFormControl extends Component<PhoneRegisterFormControlProps, PhoneRegisterFormControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}}} = topThis;

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
                    <Row style={{margin:'0 -4px'}}>
                        <Col span={16} style={{padding:'0 4px'}}>
                            {getFieldDecorator('Code', {
                                rules: [{required: true, message: 'Please input your phone code!'}],
                            })(
                                <Input prefix={<Icon type="barcode" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       size="large"
                                       placeholder="请输入验证码"/>
                            )}
                        </Col>
                        <Col span={8} style={{padding:'0 4px'}}>
                            <Button size="large" type="primary">获取验证码</Button>
                        </Col>
                    </Row>
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
const PhoneRegisterForm = Form.create({})(PhoneRegisterFormControl);
export default PhoneRegisterForm;