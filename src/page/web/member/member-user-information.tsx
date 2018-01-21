import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";
import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberUserInformationPageStates {

}

interface MemberUserInformationPageProps {

}

@withRouter
export class MemberUserInformationPage extends React.Component<MemberUserInformationPageProps, MemberUserInformationPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="member-user-information-page">
            <ContentHeaderControl title="个人消息"></ContentHeaderControl>
            <Row>MemberUserInformationPage</Row>
        </Row>
    }
}