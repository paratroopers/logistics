import * as React from 'react';
import {hashHistory,Link} from 'react-router';
import {Form, Icon, Input, Button, Checkbox, Modal, Row, Col, Layout} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {PathConfig} from '../../../config/pathconfig';
import NaLoginForget from './na-login-forget';
const {Header, Content, Footer} = Layout;
const FormItem = Form.Item;
import {NaGlobal} from '../../../util/common';
import {WebAction} from "../../../actions/index";

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

    /** 点击登录的动作*/
    onSubmit(){
        const topThis=this;
        const {props:{form}}=topThis;
        /** 更改登录的状态*/
        NaGlobal.store.dispatch(WebAction.GetLoginState(true));
        hashHistory.push(PathConfig.VIPCenterPage);
    }


    onRegister() {
        hashHistory.push(PathConfig.RegisterPage);
    }

    render() {
        const topThis=this;
        const inputSize = 'large';
        const iconSize = {fontSize: '18px', marginTop: '-8px'};
        const {getFieldDecorator} = this.props.form;
        return <Layout className="na-login">
            <Header style={{
                background: "#FFF"
            }}>
                <Row type="flex" align="middle" justify="end">
                    <Col>
                        {/*<Select defaultValue={localeKey ? localeKey : "zh"}*/}
                        {/*onChange={topThis.onChangeLanguage.bind(this)}>*/}
                        {/*<Select.Option value="zh">中文</Select.Option>*/}
                        {/*<Select.Option value="en">English</Select.Option>*/}
                        {/*</Select>*/}
                        {/*<Button onClick={() => {*/}
                        {/*hashHistory.push(PathConfig.HomePage);*/}
                        {/*}}>首页</Button>*/}
                        <Link to={PathConfig.HomePage}>返回首页 ></Link>
                    </Col>
                </Row>
            </Header>
            <Content className="na-login-content">
                <Row align="middle" justify="center" type="flex">
                    <Col className="na-login-content-col">
                        {<NaLoginForget onCancel={() => {
                            this.setState({visible: false})
                        }} visible={this.state.visible}></NaLoginForget>}
                        <div className="na-login-content-img">
                            <img style={{cursor:'pointer'}} onClick={() => {
                                hashHistory.push(PathConfig.HomePage);
                            }} src="http://www.famliytree.cn/icon/logo.png"/>
                        </div>
                        <div className="na-login-content-title">
                            <p>为你的境外物流，提供专业优质的服务</p>
                        </div>
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
                                <Button type="primary" onClick={topThis.onSubmit.bind(this)} className="na-login-content-form-button"
                                        size={inputSize}>
                                    登录
                                </Button>
                            </FormItem>
                            <FormItem>
                                或者 <a onClick={() => {
                                this.onRegister()
                            }}>现在注册!</a>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>;
    }
}

const NaLoginForm = Form.create<any>()(NaLoginFormControl);
export default NaLoginForm;
