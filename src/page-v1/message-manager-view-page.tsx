import * as React from 'react';
import {withRouter,RouteComponentProps} from 'react-router';
import {Row} from 'antd';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import FormMessageManager,{FormMessageManagerType} from "../components-v1/form-message-manager";

interface MessageManagerViewPageProps extends RouteComponentProps<any, any> {

}

interface MessageManagerViewPageStates {}


@withRouter
export class MessageManagerViewPage extends React.Component<MessageManagerViewPageProps, MessageManagerViewPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        const topThis = this;
        const {props:{location}}=topThis;
        return <Row className="message-manager-view-page view-page-form">
            <ContentHeaderControl title="查看系统通知"></ContentHeaderControl>
            <FormMessageManager type={FormMessageManagerType.View} item={location.state}></FormMessageManager>
        </Row>;
    }
}