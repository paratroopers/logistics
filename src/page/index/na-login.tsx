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
            <Layout className="na-login">
                <Layout.Content className="na-login-content">
                    <Row align="middle" justify="center" type="flex">
                        <Col lg={8} sm={24} md={12} xs={24} xl={4}>
                            <div className="na-login-content-title">
                                <p className="company-name">大陸</p>
                                <p>为你的境外物流，提供专业优质的服务</p>
                            </div>
                            <Form className="na-login-content-form">
                                <FormItem>
                                    {getFieldDecorator('userName', {
                                        rules: [{required: true, message: 'Please input your username!'}],
                                    })(
                                        <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               placeholder="手机或邮箱"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: 'Please input your Password!'}],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                               type="password"
                                               placeholder="密码"/>
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('remember', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>记住我</Checkbox>
                                    )}
                                    <a className="na-login-content-form-forgot" href="">忘记密码?</a>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="na-login-content-form-button">
                                        登录
                                    </Button>
                                </FormItem>
                                <FormItem>
                                    或 <a href="">现在注册!</a>
                                </FormItem>
                            </Form></Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }
}
