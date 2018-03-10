import * as React from 'react';
import {hashHistory, Link} from 'react-router';
import {Form, Icon, Input, Button, Checkbox, Row, Col, Layout, message} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {PathConfig, MobilePathConfig} from '../config/pathconfig';
import UserLoginForgetPage from './user-login-forget-page';
import {Global} from '../util/common';
import {WebAction} from "../actions/index";
import {Cookies} from '../util/cookie';
import {Constants, Context} from '../util/common';
import {requestNameSpace} from '../model/request';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {ResponseNameSpace} from '../model/response';

const {Header, Content} = Layout;

interface UserLoginPageProps extends FormComponentProps {

}

interface UserLoginPageStates {
    visible?: boolean;
    loading?: boolean;
    type: string;
}

class UserLoginPage extends React.Component<UserLoginPageProps, UserLoginPageStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            visible: false,
            loading: false,
            type: 'text'
        }
    }

    componentDidMount() {
        this.props.form.resetFields();
        this.setState({loading: false});
    }


    onRegister() {
        hashHistory.push(PathConfig.RegisterPage);
    }

    getToken() {
        APINameSpace.MemberAPI.GetToken().then(result => {
            if (result.Data !== "") {
                Cookies.set("Authorization", result.Data);
            }
        })

    }

    onLogin() {
        this.props.form.validateFields((err, vas) => {
            if (err) {
                return;
            } else {
                const data: requestNameSpace.LoginRequest = {
                    pwd: vas['pwd'],
                    user: vas['user']
                };
                this.setState({loading: true});
                APINameSpace.LoginApi.Login(data).then(result => {
                    this.setState({loading: false});
                    if (result.Status === 0) {
                        Cookies.set("Authorization", result.Data);
                        /** 设置登录信息*/
                        Context.setMerchantData({isLogin: true});
                        /** 更改登录的状态*/
                        Global.store.dispatch(WebAction.GetLoginState(true));
                        APINameSpace.MemberAPI.GetUserContextInfo().then((r: ResponseNameSpace.GetUserContextResponse) => {
                            if (r.Status === 0) {
                                window.localStorage.setItem('UserInfo', JSON.stringify(r.Data));
                            }
                            if (window.innerWidth <= Constants.xs)
                                hashHistory.push(MobilePathConfig.UserCenter);
                            else
                                hashHistory.push(PathConfig.MemberIndexPage);
                        });

                        // setInterval(() => this.getToken(), 1000 * 60 * 30);
                        /*                        if (window.innerWidth <= Constants.xs)
                                                    hashHistory.push(MobilePathConfig.UserCenter);
                                                else
                                                    hashHistory.push(PathConfig.MemberIndexPage);*/
                    } else {
                        message.error(result.Message);
                        /* NaNotification.error({
                         message: 'Tip',
                         description: result.Message
                         });*/
                    }
                });
            }
        })
    }

    changeType() {
        this.setState({type: 'password'});
    }


    render() {
        const inputSize = 'large';
        const iconSize = {fontSize: '18px', marginTop: '-8px'};
        const {getFieldDecorator} = this.props.form;
        const {visible} = this.state;
        return <Layout className="na-login">
            <Header className="na-login-header" style={{
                background: "#FFF"
            }}>
                <Row className="header-back-home" type="flex" align="middle" justify="end">
                    <Col xs={12} sm={24} md={0} lg={0} xl={0}>
                        <Link style={{color: '#FFFFFF'}} to={PathConfig.HomePage}>{"< 返回首页"}</Link>
                    </Col>
                    <Col xs={0} sm={0} md={24} lg={24} xl={24} style={{textAlign: 'right'}}>
                        <Link to={PathConfig.HomePage}>{"返回首页 >"}</Link>
                    </Col>
                    <Col xs={12} sm={0} md={0} lg={0} xl={0} style={{textAlign: 'right'}}>
                        <Link style={{color: '#FFFFFF'}} to={PathConfig.RegisterPage}>现在注册 ></Link>
                    </Col>
                </Row>
            </Header>
            <Content className="na-login-content">
                <Row align="middle" justify="center" type="flex">
                    <Col className="na-login-content-col">
                        {visible && <UserLoginForgetPage onCancel={() => {
                            this.setState({visible: false})
                        }} visible={visible}></UserLoginForgetPage>}
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
                                    rules: [{required: true, message: '请输入手机或者邮箱!'}],
                                })(<Input prefix={<Icon type="user" style={iconSize}/>} size={inputSize}
                                          placeholder="手机或邮箱"/>)}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('pwd', {
                                    rules: [{required: true, message: '请输入密码!'}],
                                })(
                                    <Input prefix={<Icon type="lock" style={iconSize}/>}
                                           size={inputSize}
                                           type={this.state.type}
                                           placeholder="密码" onFocus={this.changeType.bind(this)}/>
                                )}
                            </Form.Item>
                            <Form.Item>
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
                                <Row>
                                    <Col xs={0} sm={24} md={24} lg={24} xl={24}>或者 <a onClick={() => {
                                        this.onRegister()
                                    }}>现在注册!</a></Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Content>
        </Layout>;
    }
}

export default Form.create<any>()(UserLoginPage);
