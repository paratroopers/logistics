import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
    import {ContentHeaderControl}from "../components-v1/common-content-header";

interface MemberWaitPayPageStates {

}

interface MemberWaitPayPageProps {

}

@withRouter
export class MemberWaitPayPage extends React.Component<MemberWaitPayPageProps, MemberWaitPayPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-wait-pay-page">
            <ContentHeaderControl title="代付款"></ContentHeaderControl>
            <Row>MemberWaitPayPage</Row>
        </Row>
    }
}