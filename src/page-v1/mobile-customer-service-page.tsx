import * as React from 'react';
import {withRouter} from 'react-router';
import {Layout, Row, Col} from 'antd';

interface CustomerServicePageProps {
}

interface CustomerServicePageStates {
}

@withRouter
export class MobileCustomerServicePage extends React.Component<CustomerServicePageProps, CustomerServicePageStates> {

    render() {
        return <Layout className="user-help-layout">
            <Layout.Content className="user-help-layout-content">
                <Row className="wechat">
                    <Row>
                        <Col span={24}><p className="title">您的专属客服</p></Col>
                        <Col span={24}><a className="number" href="tel:400-100-2013">400-100-2013</a></Col>
                        <Col span={24}><img src="http://www.famliytree.cn/icon/wx_ewm.jpg"/></Col>
                        <Col span={24}><p className="tip">扫一扫上面的二维码图案，加客服微信</p></Col>
                    </Row>
                </Row>
            </Layout.Content>
        </Layout>
    }
}