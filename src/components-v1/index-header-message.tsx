import * as React from 'react';
import {Link} from "react-router";
import {Popover, Icon, Badge, Card, Tabs} from 'antd';
import {FormMessageList} from './form-message-list';
import {ModelNameSpace} from "../model/model";
import {PathConfig}from "../config/pathconfig";
const TabPane = Tabs.TabPane;

interface HeaderMessageProps {
    fullScreen?: boolean;
    classNameBadge?: string;
    classNamePopover?: string;
}

interface HeaderMessageStates {
    visible:boolean;
}

export class HeaderMessage extends React.Component<HeaderMessageProps, HeaderMessageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false
        }
    }


    renderContent() {
        const maxWidth = window.innerWidth;
        return <Card style={{width: this.props.fullScreen ? maxWidth : 'auto'}} className="message-card"
                     actions={[<Link to={PathConfig.MemberMessageListPage}>查看更多</Link>]}>
            <Tabs className="message-card-tabs">
                <TabPane tab="物流信息" key="0" forceRender={true}>
                    <FormMessageList isPagination={false} layoutText={true} tagStatus={true}></FormMessageList>
                </TabPane>
                <TabPane tab="消息通知" key="1" forceRender={true}>
                    <FormMessageList isPagination={false} layoutText={true} tagStatus={true}
                                     messageType={ModelNameSpace.MessageType.System}></FormMessageList>
                </TabPane>
            </Tabs>
        </Card>
    }

    render() {
        const topThis = this;
        const {props: {classNameBadge, classNamePopover}, state: {visible}} = topThis;
        return <Popover placement="bottomRight"
                        overlayClassName={`${classNamePopover ? classNamePopover : ""} header-message-popover`}
                        autoAdjustOverflow={true}
                        visible={visible}
                        onVisibleChange={(v) => {
                            topThis.setState({visible: v});
                        }}
                        content={visible ? topThis.renderContent() : null}
                        trigger="click">
            <Badge className={`${classNameBadge ? classNameBadge : ""} header-message-badge`}>
                <Icon type="bell" style={{fontSize: 16, padding: 4}}/>
            </Badge>
        </Popover>;
    }
}
