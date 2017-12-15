import * as React from 'react';
import {Button, Select, Row, Col, Form, Input} from 'antd';

interface HomeCostQueryProps {
    className?: string;
    style?: any;
}

interface HomeCostQueryStates {
}

export class HomeCostQuery extends React.Component<HomeCostQueryProps, HomeCostQueryStates> {
    render() {

        return <Row type="flex" justify="center" align="top" className={this.props.className} style={this.props.style}>
            <Col xs={0} sm={0} md={0} lg={13} xl={13}>
                <div className="banner-form-header">
                    <Row type="flex" justify="start" style={{paddingTop: '13px', paddingLeft: '21px'}}>
                        <h2>
                            <i className="iconfont icon-feiyong"></i>
                            <span>费用估算/Cost estimate</span>
                        </h2>
                    </Row>
                </div>
            </Col>
            <Col xs={0} sm={0} md={0} lg={13} xl={13} className="banner-form-parent">
                <Form layout="vertical" style={{padding: 24}}>
                    <Form.Item>
                        <Select placeholder="收货国家" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="重量（kg）公斤" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Row type="flex" justify="center" align="top">
                            <Col span={7}><Input placeholder="长" size="large"/></Col>
                            <Col span={7} offset={1}><Input placeholder="宽" size="large"/></Col>
                            <Col span={7} offset={1}><Input placeholder="高" size="large"/></Col>
                            <Col span={1}></Col>
                        </Row>
                    </Form.Item>
                    <Form.Item>
                        <Input placeholder="体积（m3）" size="large"/>
                    </Form.Item>
                    <Form.Item>
                        <Row type="flex" justify="center">
                            <Button size="large" type="primary">开始计算</Button>
                        </Row>
                    </Form.Item>
                </Form>
            </Col>
        </Row>;
    }
}