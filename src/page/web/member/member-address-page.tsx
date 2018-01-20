import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

interface MemberAddressPageStates {

}

interface MemberAddressPageProps {

}

@withRouter
export class MemberAddressPage extends React.Component<MemberAddressPageProps, MemberAddressPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-address-page">MemberAddressPage</Row>
    }
}