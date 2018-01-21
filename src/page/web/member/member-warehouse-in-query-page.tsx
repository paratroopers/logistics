import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberWarehouseInQueryPageStates {

}

interface MemberWarehouseInQueryPageProps {

}

@withRouter
export class MemberWarehouseInQueryPage extends React.Component<MemberWarehouseInQueryPageProps, MemberWarehouseInQueryPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-warehouse-in-query-page">
            <ContentHeaderControl title="入库查询"></ContentHeaderControl>
            <Row>MemberWaitPayPage</Row>
        </Row>
    }
}