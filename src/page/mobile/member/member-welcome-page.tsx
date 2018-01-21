import * as React from 'react';
import {Row, Col, Card, Tooltip, Icon} from "antd";
import {withRouter} from "react-router";
import {FormSteps} from '../../../components/form/form-steps';
import {MemberBaseInformation} from '../../../components/controls/member/member-base-information';

interface MemberWelcomePageProps {
}

interface MemberWelcomePageStates {
}

@withRouter
export class MemberWelcomePage extends React.Component<MemberWelcomePageProps, MemberWelcomePageStates> {
    renderTitle() {
        return <div>
            <span>{"您的专属仓库"}</span>
            <Tooltip
                title={<span
                    style={{whiteSpace: 'pre-line'}}>{"1、（ML0001）非常重要，请勿遗漏填写。若需联系人和手机号，请填写（曾先生）（18521327695）\r\n 2、为了航运安全，本公司不受理活体动植物、及任何形式的不明物品（没有包装说明的三无产品）\r\n 3、为了更好的进出口清关，请提醒发货方去除包裹内关于商品价格的信息，例如收据、发票、吊牌等"}</span>}>
                <Icon type="question-circle" className="title" style={{cursor: "pointer"}}/>
            </Tooltip>
        </div>
    }

    getStrpsData() {
        return [
            {
                status: 'finish',
                title: '用户无需下单直接发货到大陆的专属仓库',
                icon: <Icon type="user"/>
            },
            {
                status: 'finish',
                title: '大陆收货确认，帮您在我的仓库中生成订单',
                icon: <Icon type="check-square"/>
            },
            {
                status: 'finish',
                title: '用户在我的仓库中进行合并打包',
                icon: <i style={{
                    fontSize: '24px',
                    marginRight: '0px'
                }} className="iconfont icon-shoujianchenggong"></i>
            },
            {
                status: 'finish',
                title: '待客服确认，仓库人员打包之后，用户选择渠道付款发货',
                icon: <Icon type="check"/>
            }]
    }

    render() {
        return <div className="member-page">
            <Row className="member-welcome-page">
                <Col span={24} className="welcome-content">
                    <Card className="content-card" title={this.renderTitle()}>
                        <Card.Grid className="content-card-grid">
                            <MemberBaseInformation size={25}></MemberBaseInformation>
                        </Card.Grid>
                    </Card>
                </Col>
                <Col span={24} className="welcome-content">
                    <Card className="content-card" title="温馨提示：操作流程">
                        <Card.Grid className="content-card-grid">
                            <FormSteps direction="vertical" size="small" itemClassStyle={{height: '62px'}}
                                       data={this.getStrpsData()}></FormSteps>
                        </Card.Grid>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}