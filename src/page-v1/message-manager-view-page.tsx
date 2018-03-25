import * as React from 'react';
import {withRouter,RouteComponentProps} from 'react-router';
import {Row} from 'antd';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import FormMessageManager from "../components-v1/form-message-manager";

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
        return <Row className="message-manager-view-page">
            <ContentHeaderControl title="查看系统消息"></ContentHeaderControl>
            <FormMessageManager item={location.state}></FormMessageManager>
        </Row>;
    }
}