import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Layout, Row, Col, Tabs} from "antd";
const {Header, Content, Footer} = Layout;
const {TabPane} = Tabs;
import RegisterForm from "../../../components/controls/na-register-form";

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
        return <Layout className="page-register">
            <Content style={{minHeight: '100vh'}}>
                <Row style={{minHeight: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <h1>欢迎注册</h1>
                </Row>
                <Row style={{maxWidth: 368, margin: '0 auto'}}>
                    <Tabs defaultActiveKey="1" size='default'>
                        <TabPane tab="手机登录" key="1">
                            <RegisterForm></RegisterForm>
                        </TabPane>
                        <TabPane tab="邮箱登录" key="2">
                            <RegisterForm></RegisterForm>
                        </TabPane>
                    </Tabs>
                </Row>
            </Content>
        </Layout>
            ;
    }
}
