import * as React from "react";
import {Component} from "react";
import {withRouter,Link,hashHistory} from "react-router";
import {PathConfig}from "../../config/pathconfig";
import {Layout, Row, Col, Tabs, Button, Checkbox} from "antd";
import {RegisterEnum}from "../../../src/api/model/common-model";
const {Header, Content, Footer} = Layout;
const {TabPane} = Tabs;
import PhoneRegisterForm from "../../components/controls/na-phone-register-form";
import MailRegisterForm from "../../components/controls/na-mail-register-form";

interface NaRegisterPageProps {
}

interface NaRegisterPageStates {
    /** 注册类型*/
    tabKey: string;
}

@withRouter
export class NaRegisterPage extends Component<NaRegisterPageProps, NaRegisterPageStates> {
    phoneFrom: any;
    mailFrom: any;

    constructor(props, context) {
        super(props, context);
        this.state = {
            tabKey: RegisterEnum.phone.toString()
        }
    }

    onClick() {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        switch (tabKey) {
            case RegisterEnum.phone.toString():
                topThis.phoneFrom.props.form.validateFields({},function (err,values) {
                    
                });
                break;
            case RegisterEnum.mail.toString():
                topThis.mailFrom.props.form.validateFields({},function (err,values) {

                });
                break;
            default:
                break;
        }
    }

    render() {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        return <Layout className="na-page-register">
            <Content className="na-page-register-content" style={{minHeight: '100vh'}}>
                <Row style={{width: '100%', padding: '0 16px'}}>
                    <Row style={{textAlign: 'center'}}>
                        <div><img onClick={()=>{
                            hashHistory.push(PathConfig.HomePage);
                        }} style={{maxWidth: 368,cursor:'pointer'}} src="http://www.famliytree.cn/icon/logo.png"/></div>
                        <p style={{
                            fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.45)',
                            marginTop: '12px'
                        }}>为你的境外物流，提供专业优质的服务</p>
                    </Row>
                    <Row style={{maxWidth: 368, margin: '0 auto'}} className="register-tabs">
                        <Tabs size="large" activeKey={tabKey} tabBarStyle={{textAlign: 'center'}} onChange={(key) => {
                            topThis.setState({tabKey: key});
                        }}>
                            <TabPane tab="手机登录" key={RegisterEnum.phone.toString()}>
                                <PhoneRegisterForm wrappedComponentRef={(inst) => topThis.phoneFrom = inst}></PhoneRegisterForm>
                            </TabPane>
                            <TabPane tab="邮箱登录" key={RegisterEnum.mail.toString()}>
                                <MailRegisterForm wrappedComponentRef={(inst) => topThis.mailFrom = inst}></MailRegisterForm>
                            </TabPane>
                        </Tabs>
                    </Row>
                    <Row style={{maxWidth: 368, margin: '0 auto'}}>
                        <Col span={24}>
                            <Button size="large" type="primary" className="register-button"
                                    onClick={topThis.onClick.bind(this)}
                                    style={{width: "100%", marginBottom: '16px'}}>
                                同意条款并注册
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={12}>
                                    <Checkbox defaultChecked={true}></Checkbox>
                                    <a>《法律声明和隐私权政策》</a>
                                </Col>
                                <Col span={12} style={{textAlign:'right'}}>
                                    <span>已有账号？ <Link to={PathConfig.LoginPage}>快捷登录 ></Link> </span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Row>
            </Content>
        </Layout>
            ;
    }
}
