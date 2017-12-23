import * as React from 'react';
import {hashHistory, Link} from 'react-router';
import {Form, Icon, Input, Button, Checkbox, Row, Col, Layout} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {PathConfig, MobilePathConfig} from '../../../config/pathconfig';
import NaLoginForget from './na-login-forget';
import {NaGlobal} from '../../../util/common';
import {WebAction} from "../../../actions/index";
import {LoginRequest} from '../../../api/model/request/login-request';
import {LoginApi} from '../../../api/login';
import {Cookies} from '../../../util/cookie';
import {NaConstants} from '../../../util/common';
import {NaNotification} from '../../../components/controls/na-notification';

const {Header, Content} = Layout;

interface NaLoginFormControlProps extends FormComponentProps {

}

interface NaLoginFormControlStates {
    visible?: boolean;
    loading?: boolean;
}

class NaLoginFormControl extends React.Component<NaLoginFormControlProps, NaLoginFormControlStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            visible: false,
            loading: false
        }
    }

    componentDidMount() {
        this.props.form.resetFields();
        this.setState({loading: false});
    }


    onRegister() {
        hashHistory.push(PathConfig.RegisterPage);
    }

    onLogin() {
        this.props.form.validateFields((err, vas) => {
            if (err) {
                return;
            } else {
                const data: LoginRequest = {
                    pwd: vas['pwd'],
                    user: vas['user']
                };
                this.setState({loading: true});
                LoginApi.Login(data).then(result => {
                    this.setState({loading: false});
                    if (result.Status === 0) {
                        Cookies.set("Authorization", result.Data);
                        /** 更改登录的状态*/
                        NaGlobal.store.dispatch(WebAction.GetLoginState(true));
                        if (window.innerWidth <= NaConstants.xs)
                            hashHistory.push(MobilePathConfig.UserCenter);
                        else
                            hashHistory.push(PathConfig.VIPCenterPage);
                    } else {
                        NaNotification.error({
                            message: 'Tip',
                            description: result.Message
                        });
                    }
                });
            }
        })
    }

    render() {
        const inputSize = 'large';
        const iconSize = {fontSize: '18px', marginTop: '-8px'};
        const {getFieldDecorator} = this.props.form;
        return <Layout className="na-login">
            <Header style={{background: "#FFF"}}>
                <Row type="flex" align="middle" justify="end">
                    <Col>
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
                            <img style={{cursor: 'pointer'}} onClick={() => {
                                hashHistory.push(PathConfig.HomePage);
                            }} src="http://www.famliytree.cn/icon/logo.png"/>
                        </div>
                        <div className="na-login-content-title">
                            <p>为你的境外物流，提供专业优质的服务</p>
                        </div>
                        <Form className="na-login-content-form">
                            <Form.Item>
                                {getFieldDecorator('user', {
                                    rules: [{required: true, message: 'Please input your username!'}],
                                })(<Input prefix={<Icon type="user" style={iconSize}/>} size={inputSize}
                                          placeholder="手机或邮箱"/>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('pwd', {
                                    rules: [{required: true, message: 'Please input your Password!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={iconSize}/>}
                                           size={inputSize}
                                           type="password"
                                           placeholder="密码"/>
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox className="na-login-content-form-remember">记住我</Checkbox>
                                )}
                                <a className="na-login-content-form-forgot" onClick={() => {
                                    this.setState({visible: true})
                                }}>无法登录?</a>
                            </Form.Item>
                            <Form.Item>
                                <Button loading={this.state.loading} type="primary" htmlType="submit"
                                        className="na-login-content-form-button"
                                        onClick={this.onLogin.bind(this)}
                                        size={inputSize}>{'登录'}
                                </Button>
                            </Form.Item>
                            <Form.Item>
                                或者 <a onClick={() => {
                                this.onRegister()
                            }}>现在注册!</a>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>;
    }
}

const NaLoginForm = Form.create<any>()(NaLoginFormControl);
export default NaLoginForm;
