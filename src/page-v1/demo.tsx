import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Col, Popover, Icon, Badge, Card, Tabs} from 'antd';
import {FormMessageList} from '../components-v1/form-message-list';
const TabPane = Tabs.TabPane;

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export default class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <div className="demo-page">
            <Card style={{maxWidth: 900}} bodyStyle={{padding:0}}>
                <Tabs tabBarExtraContent={<a style={{margin:"0 32px",height:55,display:"flex",alignItems:"center"}}>查看更多</a>} tabBarStyle={{marginBottom:4}} size="large">
                    <TabPane tab="物流信息" key="0">
                        <FormMessageList layoutText={true} tagStatus={true}></FormMessageList>
                    </TabPane>
                    <TabPane tab="消息通知" key="1">
                        <FormMessageList layoutText={true} tagStatus={true} isSystem={true}></FormMessageList>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    }
}