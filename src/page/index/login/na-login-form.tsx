import * as React from 'react';
import {Form, Icon, Input, Button, Checkbox, Modal, Row, Col} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface NaLoginFormControlProps extends FormComponentProps {
}

interface NaLoginFormControlStates {
    visible?: boolean;
}

class NaLoginFormControl extends React.Component<NaLoginFormControlProps, NaLoginFormControlStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            visible: false
        }
    }

    renderModal() {
        return <Modal visible={this.state.visible}
                      className="na-login-content-tabs-modal"
                      width={350}
                      footer={false}
                      onCancel={() => {
                          this.setState({visible: false});
                      }}>
            <h1 className="title">找回密码</h1>
            <p>验证码将会发送至你的注册邮箱或手机</p>
            <Row align="top" type="flex" justify="start">
                <Col span={14}>
                    <Input placeholder="手机号或者邮箱"/>
                </Col>
                <Col offset={1} span={9}>
                    <Button type="primary">获取验证码</Button>
                </Col>
            </Row>
        </Modal>;
    }

    render() {
        const inputSize = 'large';
        const iconSize = {fontSize: '18px', marginTop: '-8px'};
        const {getFieldDecorator} = this.props.form;
        return <div>
            {this.renderModal()}
            <Form className="na-login-content-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={iconSize}/>} size={inputSize}
                               placeholder="手机或邮箱"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={iconSize}/>}
                               size={inputSize}
                               type="password"
                               placeholder="密码"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox className="na-login-content-form-remember">记住我</Checkbox>
                    )}
                    <a className="na-login-content-form-forgot" onClick={() => {
                        this.setState({visible: true})
                    }}>无法登录?</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="na-login-content-form-button" size={inputSize}>
                        登录
                    </Button>
                </FormItem>
            </Form>
        </div>;
    }
}

const NaLoginForm = Form.create()(NaLoginFormControl);
export default NaLoginForm;
