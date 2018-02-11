import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {Row} from 'antd';
import {ModelNameSpace} from '../model/model';
import {isNullOrUndefined} from "util";
import {ContentHeaderControl} from "../components-v1/common-content-header";

interface MemberMyWaitPackageViewPageProps extends RouteComponentProps<any, any>{

}

interface MemberMyWaitPackageViewPageStates {

}

@withRouter
export class MemberMyWaitPackageViewPage extends React.Component<MemberMyWaitPackageViewPageProps, MemberMyWaitPackageViewPageStates> {
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
        return <Row className="member-my-wait-package-view-page">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            {!isNullOrUndefined(viewData) ? <div>待合并查看界面</div> :
                <div>暂无数据</div>}
        </Row>;
    }
}