import * as React from 'react';
import {Row, Col, Layout, Tabs} from 'antd';
import {NaLoginForm} from './na-login-form'

interface NaLoginProps {
}

interface NaLoginStates {

}

export class NaLogin extends React.Component<NaLoginProps, NaLoginStates> {

    render() {
        return (
            <Layout className="na-login">
                <Layout.Content className="na-login-content">
                    <Row align="middle" justify="center" type="flex">
                        <Col lg={8} sm={24} md={12} xs={24} xl={4}>
                            <div className="na-login-content-title">
                                <p className="company-name">大陸</p>
                                <p>为你的境外物流，提供专业优质的服务</p>
                            </div>
                            <Tabs defaultActiveKey="1" className="na-login-content-tabs">
                                <Tabs.TabPane tab="登录" key="1"><NaLoginForm></NaLoginForm></Tabs.TabPane>
                                <Tabs.TabPane tab="注册" key="2">注册</Tabs.TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        );
    }
}
