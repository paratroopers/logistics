import * as React from 'react';
import {withRouter} from 'react-router';
import {Row} from "antd";

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
        return <Row className="member-user-information-page">MemberUserInformationPage</Row>
    }
}