import * as React from 'react';
import {Row, Col, Avatar, Card} from "antd";
import {withRouter} from "react-router";
import {FormMessageList} from '../../../components/form/form-message-list';
import {FormSteps} from '../../../components/form/form-steps';
import {BaseAPI} from '../../../api/base';
import {CustomerserviceDropdown} from '../../../components/controls/customerservice/customerservice-dropdown';

interface MemberWelcomePageProps {
}

interface MemberWelcomePageStates {
}

@withRouter
export class MemberWelcomePage extends React.Component<MemberWelcomePageProps, MemberWelcomePageStates> {
    componentDidMount() {
        this.getMessageData();
    }

    getMessageData() {
        BaseAPI.GetMesaageLatest().then(result => {
            if (result.Status === 0) {
                this.setState({messageItems: result.Data});
            }
        });
    }

    getStrpsData() {
        return [
            {
                status: 'finish',
                title: '用户无需下单直接发货到大陆的专属仓库',
                icon: 'smile'
            },
            {
                status: 'finish',
                title: '大陆收货确认，帮您在我的仓库中生成订单',
                icon: 'smile'
            },
            {
                status: 'finish',
                title: '用户在我的仓库中进行合并打包',
                icon: 'smile'
            },
            {
                status: 'finish',
                title: '待客服确认，仓库人员打包之后，用户选择渠道付款发货',
                icon: 'smile'
            }]
    }

    render() {
        const topThis = this;
        return <Row className="member-welcome-page">
            <Col span={24} className="welcome-content welcome-content-left">
                <Card className="content-card" title="您的专属仓库">
                    <Row className="content-card-warehouse">
                        <Col className="warehouse-header">
                            <p>
                                <span>收件人：</span>
                                <span>大陆17477号仓库</span>
                            </p>
                            <p>
                                <span>地址：</span>
                                <span>上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间</span>
                                <span style={{fontWeight: 'bold', fontSize: 24}}>（ML0001）</span>
                            </p>
                            <p>
                                <span>邮编：</span>
                                <span>4761111</span>
                            </p>
                            <p>
                                <span>电话：</span>
                                <span>0376-588 7777 777</span>
                            </p>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span={24}>
                <Card className="content-card" title="温馨提示：操作流程">
                    <FormSteps direction="vertical" size="small" itemClassStyle={{height: '40px'}}
                               data={this.getStrpsData()}></FormSteps>
                </Card>
            </Col>
            <Col span={24} className="welcome-content welcome-content-right">
                <Card className="content-card" title="联系客户">
                    <CustomerserviceDropdown></CustomerserviceDropdown>
                </Card>
            </Col>
            <Col span={24}>
                <Card className="content-card" title="大陆动态" extra={<a href="#">更多</a>}>
                    <FormMessageList></FormMessageList>
                </Card>
            </Col>
        </Row>;
    }
}