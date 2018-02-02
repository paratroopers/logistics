import * as React from 'react';
import {withRouter,RouteComponentProps,hashHistory} from 'react-router';
import {Row} from 'antd';
// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";
import WarehouseInForm from "../components-v1/warehouse-in-form";
import {ModelNameSpace} from '../model/model';
import {isNullOrUndefined} from "util";
import {ContentHeaderControl} from "../components-v1/common-content-header";

interface WarehouseInViewPageProps extends RouteComponentProps<any, any>{

}

interface WarehouseInViewPageStates {

}

@withRouter
export class WarehouseInViewPage extends React.Component<WarehouseInViewPageProps, WarehouseInViewPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        const topThis = this;
        const {props: {location}} = topThis;
        /** 获取页面传值*/
        const viewData: ModelNameSpace.WarehouseListModel = location.state;
        /** 未传值则返回*/
        if (isNullOrUndefined(viewData)) hashHistory.goBack();
        return <Row className="warehouse-in-view-page">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            {!isNullOrUndefined(viewData) ? <WarehouseInForm type={"view"} Data={viewData} ></WarehouseInForm> :
                <div>暂无数据</div>}
        </Row>;
    }
}