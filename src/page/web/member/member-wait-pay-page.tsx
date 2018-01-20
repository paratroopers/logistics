import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

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
        return <Row className="member-wait-pay-page">MemberWaitPayPage</Row>
    }
}