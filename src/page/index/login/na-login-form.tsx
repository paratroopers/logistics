import * as React from 'react';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';

const FormItem = Form.Item;

interface NaLoginFormControlProps extends FormComponentProps {
}

interface NaLoginFormControlStates {

}

class NaLoginFormControl extends React.Component<NaLoginFormControlProps, NaLoginFormControlStates> {
    render() {
        const {getFieldDecorator} = this.props.form;
        return (<Form className="na-login-content-form">
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
                        <Checkbox className="na-login-content-form-remember">记住我</Checkbox>
                    )}
                    <a className="na-login-content-form-forgot" href="">无法登录?</a>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="na-login-content-form-button">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const NaLoginForm = Form.create({})(NaLoginFormControl);
export default NaLoginForm;
