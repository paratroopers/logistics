import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

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
        return <Row className="member-warehouse-in-query-page">MemberWarehouseInQueryPage</Row>
    }
}