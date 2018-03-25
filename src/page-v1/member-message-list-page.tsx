import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Tabs} from "antd";
import {ContentHeaderControl}from "../components-v1/common-content-header";
import {FormMessageList} from '../components-v1/form-message-list';
import {ModelNameSpace} from "../model/model";
const TabPane=Tabs.TabPane;

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
            <ContentHeaderControl title=""></ContentHeaderControl>
            <Tabs tabBarStyle={{marginBottom:4}} size="large" tabPosition="left">
                <TabPane tab="物流消息" key="0">
                    <FormMessageList layoutText={true} tagStatus={true} isPagination={true}></FormMessageList>
                </TabPane>
                <TabPane tab="系统通知" key="1">
                    <FormMessageList layoutText={true} tagStatus={true} isPagination={true} messageType={ModelNameSpace.MessageType.System}></FormMessageList>
                </TabPane>
            </Tabs>
        </Row>
    }
}