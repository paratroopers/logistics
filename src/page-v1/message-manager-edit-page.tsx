import * as React from 'react';
import {withRouter, hashHistory,RouteComponentProps} from 'react-router';
import {Row, message} from 'antd';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import FormMessageManager from "../components-v1/form-message-manager";
import {RequestNameSpace} from '../model/request';
import {APINameSpace} from '../model/api';
import {ResponseNameSpace} from '../model/response';
import {PathConfig} from "../config/pathconfig";


interface MessageManagerEditPageProps extends RouteComponentProps<any, any>{

}

interface MessageManagerEditPageStates {

}

@withRouter
export class MessageManagerEditPage extends React.Component<MessageManagerEditPageProps, MessageManagerEditPageStates> {
    constructor(props) {
        super(props);
    }

    onSubmit = (values) => {
        const topThis = this;
        const {props:{location}}=topThis;
        const request: RequestNameSpace.UpdateMessageManagerItemRequest = {
            ID: location.state.ID,
            status: location.state.status,
            title: values.title,
            message: values.message,
            isAdmin: true
        }

        //topThis.setState({loading: true});
        APINameSpace.MemberAPI.UpdateMessageManagerItem(request).then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                message.success("编辑成功!");
                hashHistory.push(PathConfig.MessageManagerPage);
            }
        })
    }

    render() {
        const topThis = this;
        const {props: {location}} = topThis;
        return <Row className="message-manager-edit-page">
            <ContentHeaderControl title="编辑系统消息"></ContentHeaderControl>
            <FormMessageManager item={location.state} onSubmit={topThis.onSubmit.bind(this)}></FormMessageManager>
        </Row>;
    }
}