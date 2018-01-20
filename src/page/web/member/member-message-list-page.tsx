import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

interface MemberMessageListPageStates {

}

interface MemberMessageListPageProps {

}

@withRouter
export class MemberMessageListPage extends React.Component<MemberMessageListPageProps, MemberMessageListPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-message-list-page">MemberMessageListPage</Row>
    }
}