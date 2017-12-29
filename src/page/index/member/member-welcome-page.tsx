import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Row, Col} from "antd";

interface MemberWelcomePageProps {
}

interface MemberWelcomePageStates {
}

@withRouter
export class MemberWelcomePage extends Component<MemberWelcomePageProps, MemberWelcomePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return <Row>
            <Row>
                <Col span={24}>10058240**@qq.com  欢迎您回到国际仓储物流网！</Col>
                <Col span={24}>您还没有通过邮件认证<a href="#">点此发送认证邮件</a></Col>
                <Col span={24}>您还没有通过邮件认证<a href="#">点此发送认证邮件</a></Col>
                <Col span={24}>您的上一次登录时间:2017-12-06 15:23</Col>
                <Col span={24}>账户当前积分:0</Col>
                <Col span={24}>我的邀请码:17461<a href="#">[活动说明]</a></Col>
            </Row>
        </Row>;
    }
}
