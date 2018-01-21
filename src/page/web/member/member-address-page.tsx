import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

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
        return <Row className="member-address-page">
            <ContentHeaderControl title="地址维护"></ContentHeaderControl>
            <Row>MemberAddressPage</Row>
        </Row>
    }
}