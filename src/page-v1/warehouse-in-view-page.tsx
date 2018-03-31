import * as React from 'react';
import {withRouter,RouteComponentProps} from 'react-router';
import {Row} from 'antd';
import WarehouseInForm from "../components-v1/warehouse-in-form";
import {ContentHeaderControl} from "../components-v1/common-content-header";

interface WarehouseInViewPageProps extends RouteComponentProps<any, any>{}

interface WarehouseInViewPageStates {}

@withRouter
export class WarehouseInViewPage extends React.Component<WarehouseInViewPageProps, WarehouseInViewPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        const topThis = this;
        const {props: {location}} = topThis;
        return <Row className="warehouse-in-view-page view-page-form">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            <WarehouseInForm type={"view"} ID={location.state.ID}></WarehouseInForm>
        </Row>;
    }
}