import * as React from 'react';
import {Button, Icon, Row, Col, Form, Input} from 'antd';

interface HomeCostQueryProps {
}

interface HomeCostQueryStates {
}

export class HomeCostQuery extends React.Component<HomeCostQueryProps, HomeCostQueryStates> {
    render() {
        return <Row type="flex" justify="center" key="form">
            <Col xs={0} sm={0} md={0} lg={10} xl={10} className="banner-form-parent">
                <Form layout="vertical" style={{padding: 24}}>
                    <Form.Item>
                        <Input prefix={<i className="iconfont icon-guojia input-icon"></i>} placeholder="收货国家" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<i className="iconfont icon-zhongliang input-icon"></i>} placeholder="重量（kg）公斤" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<i className="iconfont icon-tiji input-icon"></i>} placeholder="体积（m3）" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Row type="flex" justify="center">
                            <Button size="large" type="primary">开始计算</Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    }
}