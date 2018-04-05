import * as React from "react";
import {Component} from "react";
import {withRouter, Link} from "react-router";
import {Row, Col, Card, Icon, Tooltip, Tabs} from "antd";
import {Global, Context} from '../util/common';
import {CommonLocale} from '../locales/localeid';
import * as moment from 'moment';
import {MemberWelcomeTab} from "../components-v1/member-welcome-tab";
import {FormMessageList} from '../components-v1/form-message-list';
import {FormSteps} from '../components-v1/form-steps';
import {ContactCustomerService} from '../components-v1/customer-service-dropdown';
import {MemberBaseInformation} from '../components-v1/member-base-information';
import {ContentHeaderControl}from "../components-v1/common-content-header";
import {UserAvatar} from "../components-v1/user-avatar";
import {ModelNameSpace} from "../model/model";
import {PathConfig} from "../config/pathconfig";
const TabPane = Tabs.TabPane;

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
        var MemberCode = "";
        try {
            MemberCode = Context.getCurrentUser().userInfo.MemeberCode;
        } catch (ex) {
            MemberCode = "";
        }
        return <Row type="flex" justify="space-between" align="middle" className="welcome-header-content">
            <Col>
                <Row type="flex" justify="start" align="middle">
                    <Col>
                        <UserAvatar className="header-avatar" size={72}
                                    src="http://www.famliytree.cn/icon/timor.png"></UserAvatar>
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
                <Card className="content-card" style={{maxWidth: 900}} bodyStyle={{padding: 0}}>
                    <Card.Grid className="content-card-grid" style={{padding: 0}}>
                        <Tabs tabBarExtraContent={<Link to={{pathname: PathConfig.MemberMessageListPage}} style={{
                            margin: "0 32px",
                            height: 55,
                            display: "flex",
                            alignItems: "center"
                        }}>查看更多</Link>} tabBarStyle={{marginBottom: 4}} size="large">
                            <TabPane tab="物流信息" key="0">
                                <FormMessageList layoutText={true} tagStatus={true}></FormMessageList>
                            </TabPane>
                            <TabPane tab="消息通知" key="1">
                                <FormMessageList layoutText={true} tagStatus={true}
                                                 messageType={ModelNameSpace.MessageType.System}></FormMessageList>
                            </TabPane>
                        </Tabs>
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
                        <ContactCustomerService></ContactCustomerService>
                    </Card.Grid>
                </Card>
            </Col>
        </Row>;
    }
}
