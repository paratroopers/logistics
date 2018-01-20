import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

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
        return <Row className="member-my-order-page">MemberMyOrderPage</Row>
    }
}