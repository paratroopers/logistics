import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

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
        return <Row className="member-message-list-page">
            <ContentHeaderControl title="大陆动态"></ContentHeaderControl>
            <Row>MemberMessageListPage</Row>
        </Row>
    }
}