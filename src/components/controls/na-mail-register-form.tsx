import * as React from "react";
import {Component} from "react";
import {Form, Input, Icon, Button, Row, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
const FormItem = Form.Item;

interface MailRegisterFormControlProps extends FormComponentProps {
    onClickCode?: React.FormEventHandler<any>;
}

interface MailRegisterFormControlStates {

}

class MailRegisterFormControl extends Component<MailRegisterFormControlProps, MailRegisterFormControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator},onClickCode}} = topThis;

        return (
            <Form className="na-page-register-form">
                <FormItem>
                    {getFieldDecorator('Mail', {
                        rules: [{required: true, message: 'Please input your phone number!'}],
                    })(
                        <Input size="large" prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               placeholder="请输入你的邮箱"/>
                    )}
                </FormItem>
                <FormItem>
                    <Row style={{margin: '0 -4px'}}>
                        <Col span={16} style={{padding: '0 4px'}}>
                            {getFieldDecorator('Code', {
                                rules: [{required: true, message: 'Please input your phone code!'}],
                            })(
                                <Input prefix={<Icon type="barcode" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                       size="large"
                                       placeholder="请输入验证码"/>
                            )}
                        </Col>
                        <Col span={8} style={{padding: '0 4px'}}>
                            <Button size="large" type="primary" style={{width: '100%'}} onClick={onClickCode}>获取验证码</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    {getFieldDecorator('Password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               size="large"
                               type="password"
                               placeholder="设置你的登录密码"/>
                    )}

                </FormItem>
                <FormItem>
                    {getFieldDecorator('NextPassword', {
                        rules: [{required: true, message: 'Please input your Password again!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                               size="large"
                               type="password"
                               placeholder="请再次输入你的密码"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
const MailRegisterForm = Form.create<any>()(MailRegisterFormControl);
export default MailRegisterForm;