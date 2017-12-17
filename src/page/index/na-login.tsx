import * as React from 'react';
import {Form, Icon, Input, Button, Checkbox, Row, Col, Layout} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface NaLoginProps extends FormComponentProps {
}

interface NaLoginStates {

}


@Form.create()
export class NaLogin extends React.Component<NaLoginProps, any> {

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Layout.Content>
                    <Row align="middle" justify="center" type="flex">
                        <Col>
                            <Form className="login-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="Username"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="Password"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Remember me</Checkbox>
                                    )}
                                    <a className="login-form-forgot" href="">Forgot password</a>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Log in
                                    </Button>
                                    Or <a href="">register now!</a>
                                </FormItem>
                            </Form></Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }
}
