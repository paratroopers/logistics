import * as React from 'react';
import {Link} from "react-router";
import {Popover, Icon, Badge, Card, Tabs} from 'antd';
import {FormMessageList} from './form-message-list';
import {ModelNameSpace} from "../model/model";
import {PathConfig}from "../config/pathconfig";
import {ResponseNameSpace} from '../model/response';
import {APINameSpace} from '../model/api';
const TabPane = Tabs.TabPane;

interface HeaderMessageProps {
    fullScreen?: boolean;
    classNameBadge?: string;
    classNamePopover?: string;
}

interface HeaderMessageStates {
    /** 面板显示隐藏*/
    visible: boolean;
    /** 未读数量*/
    unreadCount: number;
}

export class HeaderMessage extends React.Component<HeaderMessageProps, HeaderMessageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            visible: false,
            unreadCount: 0
        }
    }

    componentDidMount() {
        /** 首次加载获取数量*/
        this.getUnReadCount();
    }

    getUnReadCount() {
        const topThis = this;
        APINameSpace.MemberAPI.GetMessageUnreadCount().then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                topThis.setState({
                    unreadCount: result.Data
                });
            }
        });
    }

    setUnReadCount() {
        const topThis=this;
        APINameSpace.MemberAPI.UpdateMessageUnreadCount().then((result: ResponseNameSpace.BaseResponse) => {
            if (result.Status === 0) {
                topThis.setState({
                    unreadCount: 0
                });
            }else {
                console.log("Don't Update Message Unread Count!")
            }
        });
    }

    onClickMessageItem() {
        const topThis = this;
        topThis.setState({visible: false});
    }

    renderContent() {
        const topThis=this;
        const maxWidth = window.innerWidth;
        return <Card style={{width: this.props.fullScreen ? maxWidth : 'auto'}} className="message-card"
                     actions={[<Link onClick={topThis.onClickMessageItem.bind(this)} to={PathConfig.MemberMessageListPage}>查看更多</Link>]}>
            <Tabs className="message-card-tabs">
                <TabPane tab="物流消息" key="0">
                    <FormMessageList onClick={topThis.onClickMessageItem.bind(this)} isPagination={false} layoutText={true} tagStatus={true}></FormMessageList>
                </TabPane>
                <TabPane tab="系统通知" key="1">
                    <FormMessageList onClick={topThis.onClickMessageItem.bind(this)} isPagination={false} layoutText={true} tagStatus={true}
                                     messageType={ModelNameSpace.MessageType.System}></FormMessageList>
                </TabPane>
            </Tabs>
        </Card>
    }

    render() {
        const topThis = this;
        const {props: {classNameBadge, classNamePopover}, state: {visible, unreadCount}} = topThis;
        return <Popover placement="bottomRight"
                        overlayClassName={`${classNamePopover ? classNamePopover : ""} header-message-popover`}
                        autoAdjustOverflow={true}
                        visible={visible}
                        onVisibleChange={(v) => {
                            topThis.setState({visible: v});
                            if (unreadCount > 0 && v) {
                                /** 如果存在未读消息，并且弹出则进行更新*/
                                topThis.setUnReadCount();
                            }
                        }}
                        content={visible ? topThis.renderContent() : null}
                        trigger="click">
            <Badge count={unreadCount} className={`${classNameBadge ? classNameBadge : ""} header-message-badge`}>
                <Icon type="bell" style={{fontSize: 16, padding: 4}}/>
            </Badge>
        </Popover>;
    }
}
