import * as React from 'react';
import {Row, Col, Popover, Icon, Badge, Card, Tabs} from 'antd';
import {FormMessageList} from './form-message-list';
const TabPane = Tabs.TabPane;

interface HeaderMessageProps {
    fullScreen?: boolean;
    classNameBadge?: string;
    classNamePopover?: string;
}

interface HeaderMessageStates {

}

export class HeaderMessage extends React.Component<HeaderMessageProps, HeaderMessageStates> {
    constructor(props, context) {
        super(props, context);
    }


    renderContent() {
        const maxWidth = window.innerWidth;
        return <Card style={{width: this.props.fullScreen ? maxWidth : 'auto'}} className="message-card"
                     actions={["查看更多"]}>
            <Tabs className="message-card-tabs">
                <TabPane tab="物流信息" key="0">
                    <FormMessageList layoutText={true} tagStatus={true}></FormMessageList>
                </TabPane>
                <TabPane tab="消息通知" key="1">
                    <FormMessageList layoutText={true} tagStatus={true}></FormMessageList>
                </TabPane>
            </Tabs>
        </Card>
    }

    render() {
        const topThis = this;
        const {props: {classNameBadge, classNamePopover}} = topThis;
        return <Popover placement="bottomRight"
                        overlayClassName={`${classNamePopover ? classNamePopover : ""} header-message-popover`}
                        autoAdjustOverflow={true}
                        content={topThis.renderContent()}
                        trigger="click">
            <Badge className={`${classNameBadge ? classNameBadge : ""} header-message-badge`}>
                <Icon type="bell" style={{fontSize: 16, padding: 4}}/>
            </Badge>
        </Popover>;
    }
}
