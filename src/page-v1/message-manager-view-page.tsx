import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Row} from 'antd';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {ModelNameSpace} from "../model/model";
import * as  moment from 'moment';
moment.locale('zh-cn')

interface MessageManagerViewPageProps extends RouteComponentProps<any, any> {

}

interface MessageManagerViewPageStates {
}


@withRouter
export class MessageManagerViewPage extends React.Component<MessageManagerViewPageProps, MessageManagerViewPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        const topThis = this;
        const {props: {location}} = topThis;
        const item: ModelNameSpace.MessageModel = location.state as ModelNameSpace.MessageModel;
        return <Row className="message-manager-view-page">
            <ContentHeaderControl title="查看"></ContentHeaderControl>
            <h1 style={{textAlign: "center"}}>{item.title}</h1>
            <p style={{textAlign: "center"}}>
                <span className="team-mao">发布时间</span>
                {moment(item.Created).format("llll")}
            </p>
            <div className="message-page-content" dangerouslySetInnerHTML={{__html: item.message}}></div>
        </Row>;
    }
}