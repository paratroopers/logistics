import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {Row} from 'antd';
import {ModelNameSpace} from '../model/model';
import {isNullOrUndefined} from "util";
import {ContentHeaderControl, WarehouseInForm} from "../components-v1/all-components-export";

interface MemberMyOrderApprovalViewPageProps extends RouteComponentProps<any, any>{

}

interface MemberMyOrderApprovalViewPageStates {

}

@withRouter
export class MemberMyOrderApprovalViewPage extends React.Component<MemberMyOrderApprovalViewPageProps, MemberMyOrderApprovalViewPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        const topThis = this;
        const {props: {location}} = topThis;
        /** 获取页面传值*/
        const viewData: ModelNameSpace.CustomerOrderModel = location.state;
        /** 未传值则返回*/
        if (isNullOrUndefined(viewData)) hashHistory.goBack();
        return <Row className="member-my-order-package-view-page">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            {!isNullOrUndefined(viewData) ? <WarehouseInForm type={"view"} Data={viewData}></WarehouseInForm> :
                <div>暂无数据</div>}
        </Row>;
    }
}
