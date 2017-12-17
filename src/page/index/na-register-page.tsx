import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout, Row, Col, Tabs,Button,Checkbox} from "antd";
const {Header, Content, Footer} = Layout;
const {TabPane} = Tabs;
import PhoneRegisterForm from "../../components/controls/na-phone-register-form";
import MailRegisterForm from "../../components/controls/na-mail-register-form";

interface NaRegisterPageProps {
}

interface NaRegisterPageStates {
}

@withRouter
export class NaRegisterPage extends Component<NaRegisterPageProps, NaRegisterPageStates> {
    constructor(props, context) {
        super(props, context);

    }

    render() {
        return <Layout className="na-page-register">
            <Content className="na-page-register-content" style={{minHeight: '100vh'}}>
                <Row style={{width:'100%'}}>
                    <Row style={{textAlign:'center'}}>
                        <h1 style={{fontSize: '70px',color: '#e64900'}}>大陸</h1>
                        <p style={{fontSize: '14px',
                            color: 'rgba(0, 0, 0, 0.45)',
                            marginTop: '12px',
                            marginBottom: '40px'}}>为你的境外物流，提供专业优质的服务</p>
                    </Row>
                    <Row style={{maxWidth: 368, margin: '0 auto'}}>
                        <Tabs defaultActiveKey="1"tabBarStyle={{textAlign:'center'}}>
                            <TabPane tab="手机登录" key="1">
                                <PhoneRegisterForm></PhoneRegisterForm>
                            </TabPane>
                            <TabPane tab="邮箱登录" key="2">
                                <MailRegisterForm></MailRegisterForm>
                            </TabPane>
                        </Tabs>
                    </Row>
                    <Row style={{maxWidth: 368, margin: '0 auto'}}>
                        <Col span={24}>
                            <Button type="primary" className="register-button" style={{width: "100%",marginBottom: '16px'}}>
                                同意条款并注册
                            </Button>
                        </Col>
                        <Col span={24}>
                            <Checkbox>《法律声明和隐私权政策》</Checkbox>
                        </Col>
                    </Row>
                </Row>
            </Content>
        </Layout>
            ;
    }
}
