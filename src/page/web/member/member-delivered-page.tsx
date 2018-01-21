import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberDeliveredPageStates {

}

interface MemberDeliveredPageProps {

}

@withRouter
export class MemberDeliveredPage extends React.Component<MemberDeliveredPageProps, MemberDeliveredPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-delivered-page">
            <ContentHeaderControl title="已发货"></ContentHeaderControl>
            <Row>MemberDeliveredPage</Row>
        </Row>
    }
}