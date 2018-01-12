import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Row, Col, Avatar, Breadcrumb} from "antd";

interface MemberWelcomePageProps {
}

interface MemberWelcomePageStates {
}

@withRouter
export class MemberWelcomePage extends Component<MemberWelcomePageProps, MemberWelcomePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    renderHeader() {
        const topThis = this;
        return <Row type="flex" justify="space-between" align="middle" style={{marginBottom: 16}}>
            <Col>
                <Row type="flex" justify="start" align="middle">
                    <Col>
                        <Avatar style={{
                            borderRadius: '72px',
                            display: 'block',
                            width: '72px',
                            height: '72px',
                            backgroundColor: '#FFF'
                        }}
                                size="large" icon="user"
                                src="http://www.famliytree.cn/icon/timor.png"/>
                    </Col>
                    <Col style={{marginLeft: 16, position: 'relative', top: 4}}>
                        <Row>
                            <h2>早安，Handy，祝你开心每一天！</h2>
                        </Row>
                        <Row>
                            <p>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</p>
                        </Row>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Row type="flex" justify="end" align="middle">
                    <Col>待打包</Col>
                    <Col>待打包</Col>
                    <Col>待打包</Col>
                </Row>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Row className="member-welcome-page">
            <Col style={{padding: 16}}>
                <Breadcrumb style={{marginBottom: 16}}>
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>个人信息</Breadcrumb.Item>
                </Breadcrumb>
                {topThis.renderHeader()}
            </Col>
        </Row>;
    }
}
