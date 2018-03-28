import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Tabs} from "antd";
import {ContentHeaderControl}from "../components-v1/common-content-header";
import {FormMessageList} from '../components-v1/form-message-list';
import {ModelNameSpace} from "../model/model";
const TabPane=Tabs.TabPane;


interface MemberMessageListPageProps {

}

interface MemberMessageListPageStates {
    tabKey?: string;
}

@withRouter
export class MemberMessageListPage extends React.Component<MemberMessageListPageProps, MemberMessageListPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: "0"
        }
    }

    render() {
        const topThis = this;
        const {state: {tabKey}} = topThis;
        return <Row className="member-message-list-page mainland-content-page">
            <ContentHeaderControl title="消息动态"></ContentHeaderControl>
            <Tabs activeKey={tabKey} tabBarStyle={{marginBottom: 4}} size="large" tabPosition="left" onChange={(v) => {
                topThis.setState({tabKey: v});
            }}>
                <TabPane tab="物流消息" key="0">
                    {tabKey === "0" ? <FormMessageList layoutText={true} tagStatus={true}
                                                       isPagination={true}></FormMessageList> : null}
                </TabPane>
                <TabPane tab="系统通知" key="1">
                    {tabKey === "1" ? <FormMessageList layoutText={true} tagStatus={true} isPagination={true}
                                                       messageType={ModelNameSpace.MessageType.System}></FormMessageList> : null}
                </TabPane>
            </Tabs>
        </Row>
    }
}