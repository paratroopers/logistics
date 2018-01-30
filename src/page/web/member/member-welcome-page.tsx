import * as React from "react";
import {Component} from "react";
import {withRouter} from "react-router";
import {Row, Col, Avatar, Card, Icon, Tooltip} from "antd";
import {Global, Context} from '../../../util/common';
import {CommonLocale} from '../../../locales/localeid';
import * as moment from 'moment';
import {MemberWelcomeTab} from "../../../components/controls/member/member-welcome-tab";
import {FormMessageList} from '../../../components/form/form-message-list';
import {FormSteps} from '../../../components/form/form-steps';
import {CustomerserviceDropdown} from '../../../components/controls/customerservice/customerservice-dropdown';
import {MemberBaseInformation} from '../../../components/controls/member/member-base-information';
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

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

    timeInterval() {
        const hours = moment().hour();
        const {HeaderGoodMorning, HeaderGoodNoon, HeaderGoodEvening} = CommonLocale
        let helloMessage: string;
        if (hours >= 0 && hours <= 12) helloMessage = Global.intl.formatMessage({id: HeaderGoodMorning});
        if (hours > 12 && hours <= 18) helloMessage = Global.intl.formatMessage({id: HeaderGoodNoon});
        if (hours > 18 && hours <= 24) helloMessage = Global.intl.formatMessage({id: HeaderGoodEvening});
        return helloMessage;
    }

    renderHeader() {
        var MemberCode="";
        try {MemberCode=Context.getCurrentUser().userInfo.MemeberCode;}catch (ex) {MemberCode = "";}
        return <Row type="flex" justify="space-between" align="middle" className="welcome-header-content">
            <Col>
                <Row type="flex" justify="start" align="middle">
                    <Col>
                        <Avatar className="header-avatar"
                                size="large" icon="user"
                                src="http://www.famliytree.cn/icon/timor.png"/>
                    </Col>
                    <Col className="header-content">
                        <h2>{this.timeInterval()}，{MemberCode}</h2>
                        <p>欢迎你来到大陆网，体验更便捷的服务</p>
                    </Col>
                </Row>
            </Col>
            <Col>
                <MemberWelcomeTab></MemberWelcomeTab>
            </Col>
        </Row>
    }

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
        const topThis = this;
        return <Row className="member-welcome-page">
            <ContentHeaderControl title="我的仓库"></ContentHeaderControl>
            <Col className="welcome-header">
                {topThis.renderHeader()}
            </Col>
            <Col span={16} className="welcome-content welcome-content-left">
                <Card className="content-card" title={this.renderTitle()}>
                    <Card.Grid className="content-card-grid">
                        <MemberBaseInformation size={25}></MemberBaseInformation>
                    </Card.Grid>
                </Card>
                <Card className="content-card" title="大陆动态" extra={<a href="#">更多</a>}>
                    <Card.Grid className="content-card-grid">
                        <FormMessageList layoutText={true}></FormMessageList>
                    </Card.Grid>
                </Card>
            </Col>
            <Col span={8} className="welcome-content welcome-content-right">
                <Card className="content-card" title="温馨提示：操作流程">
                    <Card.Grid className="content-card-grid">
                        <FormSteps direction="vertical" size="small" itemClassStyle={{height: '62px'}}
                                   data={this.getStrpsData()}></FormSteps>
                    </Card.Grid>
                </Card>
                <Card className="content-card" title="联系客服">
                    <Card.Grid className="content-card-grid">
                        <CustomerserviceDropdown size={25} style={{marginBottom: '3px'}}></CustomerserviceDropdown>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>;
    }
}
