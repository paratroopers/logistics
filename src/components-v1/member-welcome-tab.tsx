import * as React from 'react';
import {Row, Col, Card} from 'antd';
import {Link} from 'react-router';
import {FormStepIcon, FormStepEnum} from './form-step-icon';
import {ResponseNameSpace} from '../model/response';
import {ModelNameSpace} from '../model/model';
import {PathConfig}from "../config/pathconfig";
import {APINameSpace} from '../model/api';
import {isNullOrUndefined} from "util";

interface MemberWelcomeTabProps {

}

interface MemberWelcomeTabStates {
    statusData?: ModelNameSpace.MemberOrderStatusModel;
}

export class MemberWelcomeTab extends React.Component<MemberWelcomeTabProps, MemberWelcomeTabStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            statusData: null
        }
    }

    componentDidMount() {
        const topThis = this;
        APINameSpace.MemberAPI.GetMemberOrderStatus().then((result: ResponseNameSpace.GetMemberOrderStatusResponse) => {
            if (result.Status === 0) {
                topThis.setState({statusData: result.Data});
            }
        })
    }

    renderItem() {
        const topThis = this;
        const {state: {statusData}} = topThis;
        const data = [{
            topText: "待打包",
            bottomText: !isNullOrUndefined(statusData) ? statusData.waitForCustomerPackgeCount : 0,
            key: PathConfig.MemberMyOrderPage,
            iconType: FormStepEnum.WaitForPack,
            isDivision: true
        }, {
            topText: "待付款",
            bottomText: !isNullOrUndefined(statusData) ? statusData.waitForPayCount : 0,
            key: PathConfig.MemberWaitPayPage,
            iconType: FormStepEnum.WaitForPay,
            isDivision: true
        }, {
            topText: "已发货",
            bottomText: !isNullOrUndefined(statusData) ? statusData.DeliveryDoneCount : 0,
            key: PathConfig.MemberDeliveredPage,
            iconType: FormStepEnum.Delivered,
            isDivision: false
        }];

        return data.map(item => {
            return <Col span={8} key={item.key}>
                <Link to={item.key}>
                    <Card bordered={false} className={item.isDivision ? "member-welcome-tab-division" : ""}>
                        <Row type="flex" justify="start">
                            <Col className="welcome-icon">
                                <FormStepIcon size={40}
                                              type={item.iconType}></FormStepIcon>
                            </Col>
                            <Col>
                                <p className="p-top">{item.topText}</p>
                                <p className="p-bottom">{item.bottomText}</p>
                            </Col>
                        </Row>
                    </Card>
                </Link>
            </Col>;
        })
    }

    render() {
        const topThis = this;
        return <Row type="flex" justify="end" align="middle" className="member-welcome-tab">
            {topThis.renderItem()}
        </Row>;
    }
}