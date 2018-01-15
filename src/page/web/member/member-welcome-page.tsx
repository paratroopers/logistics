import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Row, Col, Avatar, Card } from "antd";

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
        return <Row type="flex" justify="space-between" align="middle">
            <Col>
                <Row type="flex" justify="start" align="middle">
                    <Col>
                        <Avatar className="header-avatar"
                                size="large" icon="user"
                                src="http://www.famliytree.cn/icon/timor.png"/>
                    </Col>
                    <Col className="header-content">
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
            <Col className="welcome-header">
                {topThis.renderHeader()}
            </Col>
            <Col span={16} className="welcome-content welcome-content-left">
                <Card className="content-card" title="您的专属仓库">
                    <Row className="content-card-warehouse">
                        <Col className="warehouse-header">
                            <p>
                                <span>收件人</span>
                                <span>大陆17477号仓库</span>
                            </p>
                            <p>
                                <span>地址</span>
                                <span>上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间</span>
                                <span>（ML0001）</span>
                            </p>
                            <p>
                                <span>邮编</span>
                                <span>4761111</span>
                            </p>
                            <p>
                                <span>电话</span>
                                <span>0376-588 7777 777</span>
                            </p>
                        </Col>
                    </Row>
                </Card>
                <Card className="content-card" title="大陆动态" extra={<a href="#">更多</a>}>

                </Card>
            </Col>
            <Col span={8} className="welcome-content welcome-content-right">
                <Card className="content-card" title="温馨提示：操作流程">

                </Card>
                <Card className="content-card" title="联系客户">

                </Card>
            </Col>
        </Row>;
    }
}
