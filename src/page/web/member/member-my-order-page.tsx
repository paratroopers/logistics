import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberMyOrderPageStates {

}

interface MemberMyOrderPageProps {

}

@withRouter
export class MemberMyOrderPage extends React.Component<MemberMyOrderPageProps, MemberMyOrderPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-my-order-page">
            <ContentHeaderControl title="我的订单"></ContentHeaderControl>
            <Row>MemberMyOrderPage</Row>
        </Row>
    }
}