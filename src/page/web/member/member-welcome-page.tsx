import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Row, Col, Avatar, Card, Icon} from "antd";
const CardMeta=Card.Meta;
import {FormMessageList} from '../../../components/form/form-message-list';
import {FormSteps} from '../../../components/form/form-steps';
import {CustomerserviceDropdown} from '../../../components/controls/customerservice/customerservice-dropdown';
import {MemberBaseInformation} from '../../../components/controls/member/member-base-information';

interface MemberWelcomePageProps {
}

interface MemberWelcomePageStates {

}

@withRouter
export class MemberWelcomePage extends Component<MemberWelcomePageProps, MemberWelcomePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    getStrpsData() {
        return [
            {
                status: 'finish',
                title: '用户无需下单直接发货到大陆的专属仓库',
                icon: <Icon style={{color: '#079bef'}} type="user"/>
            },
            {
                status: 'finish',
                title: '大陆收货确认，帮您在我的仓库中生成订单',
                icon: <Icon style={{color: '#079bef'}} type="check-square"/>
            },
            {
                status: 'finish',
                title: '用户在我的仓库中进行合并打包',
                icon: <i style={{
                    color: '#079bef', fontSize: '24px',
                    marginRight: '0px'
                }} className="iconfont icon-shoujianchenggong"></i>
            },
            {
                status: 'finish',
                title: '待客服确认，仓库人员打包之后，用户选择渠道付款发货',
                icon: <Icon style={{color: '#079bef'}} type="check"/>
            }]
    }

    renderHeader() {
        const topThis = this;
        return <Row type="flex" justify="space-between" align="middle">
            <Col span={12}>
                <Row type="flex" justify="start" align="middle">
                    <Col>
                        <Avatar className="header-avatar"
                                size="large" icon="user"
                                src="http://www.famliytree.cn/icon/timor.png"/>
                    </Col>
                    <Col className="header-content">
                        <h2>早安，Handy</h2>
                        <p>欢迎你来到大陆网，体验便捷的服务</p>
                    </Col>
                </Row>
            </Col>
            <Col span={12}>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card hoverable={true}>
                            <Row>
                                <Col>
                                    <i style={{
                                        color: '#079bef', fontSize: '24px',
                                        marginRight: '0px'
                                    }} className="iconfont icon-shoujianchenggong"></i>
                                </Col>
                                <Col>
                                    <span>待打包</span>
                                    <span>12</span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable={true}>
                            <Row>
                                <Col>
                                    <i style={{
                                        color: '#079bef', fontSize: '24px',
                                        marginRight: '0px'
                                    }} className="iconfont icon-shoujianchenggong"></i>
                                </Col>
                                <Col>
                                    <span>待打包</span>
                                    <span>12</span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable={true}>
                            <Row>
                                <Col>
                                    <i style={{
                                        color: '#079bef', fontSize: '24px',
                                        marginRight: '0px'
                                    }} className="iconfont icon-shoujianchenggong"></i>
                                </Col>
                                <Col>
                                    <span>待打包</span>
                                    <span>12</span>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
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
                    <Card.Grid className="content-card-grid">
                        <MemberBaseInformation></MemberBaseInformation>
                    </Card.Grid>
                </Card>
                <Card className="content-card" title="大陆动态" extra={<a href="#">更多</a>}>
                    <Card.Grid className="content-card-grid">
                        <FormMessageList></FormMessageList>
                    </Card.Grid>
                </Card>
            </Col>
            <Col span={8} className="welcome-content welcome-content-right">
                <Card className="content-card" title="温馨提示：操作流程">
                    <Card.Grid className="content-card-grid">
                        <FormSteps direction="vertical" size="small" itemClassStyle={{height: '80px'}}
                                   data={this.getStrpsData()}></FormSteps>
                    </Card.Grid>
                </Card>
                <Card className="content-card" title="联系客户">
                    <Card.Grid className="content-card-grid">
                        <CustomerserviceDropdown></CustomerserviceDropdown>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>;
    }
}
