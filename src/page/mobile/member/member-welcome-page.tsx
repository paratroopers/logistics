import * as React from 'react';
import {Row, Col, Card, Tooltip, Icon} from "antd";
import {withRouter} from "react-router";
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

    render() {
        return <div className="member-page">
            <Row className="member-welcome-page">
                <Col span={24} className="welcome-content">
                    <Card className="content-card" title={this.renderTitle()}>
                        <Card.Grid className="content-card-grid">
                            <MemberBaseInformation size={25}></MemberBaseInformation>
                        </Card.Grid>
                    </Card>
                </Col></Row>
        </div>
    }
}