import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {Row} from 'antd';
import {ModelNameSpace} from '../model/model';
import {
    ContentHeaderControl,
    FormOrderInfo,
    FormOrderRelation,
    FormOrderAddressee,
    FormOrderDeclare,
    FormOrderChannel,
    FormPackageRequirement
} from "../components-v1/all-components-export";
import {isNullOrUndefined} from "util";

interface MemberMyOrderApprovalViewPageProps extends RouteComponentProps<any, any>{

}

interface MemberMyOrderApprovalViewPageStates {
    /** 原始订单ID*/
    selectedKey?: string;
}
export interface QueryData {
    ids?: string
}


@withRouter
export class MemberMyOrderApprovalViewPage extends React.Component<MemberMyOrderApprovalViewPageProps, MemberMyOrderApprovalViewPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).ids
        }
    }

    componentDidMount(){
        const topThis=this;
        const {state:{selectedKey}}=topThis;
        /** 未传值则返回*/
        if (isNullOrUndefined(selectedKey)) hashHistory.goBack();
    }

    render() {
        const topThis = this;
        return <Row className="member-my-order-package-view-page">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            <FormOrderInfo></FormOrderInfo>
            <FormOrderRelation></FormOrderRelation>
            <FormOrderAddressee></FormOrderAddressee>
            <FormOrderDeclare></FormOrderDeclare>
            <FormOrderChannel></FormOrderChannel>
            <FormPackageRequirement></FormPackageRequirement>
        </Row>;
    }
}
