import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

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
        return <Row className="member-delivered-page">MemberDeliveredPage</Row>
    }
}