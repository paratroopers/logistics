import * as React from 'react';
import {Row, Col, Popover, Avatar, Icon, Badge, Card} from 'antd';
import {FormMessageList} from './form-message-list';

interface HeaderMessageProps {
    fullScreen?: boolean;
}

interface HeaderMessageStates {

}

export class HeaderMessage extends React.Component<HeaderMessageProps, HeaderMessageStates> {
    constructor(props, context) {
        super(props, context);
    }


    renderContent() {
        const maxWidth = window.innerWidth;
        return <Card style={{width: this.props.fullScreen ? maxWidth : 'auto'}} title="大陆动态" extra={<a href="#">更多</a>}
                     className="header-message-card">
            <FormMessageList layoutText={true} tagStatus={true}></FormMessageList>
        </Card>
    }

    render() {
        const topThis = this;
        return <Popover placement="bottomRight"
                        overlayClassName="tool-message-popover"
                        autoAdjustOverflow={true}
                        content={topThis.renderContent()}
                        trigger="click">
            <Badge>
                <Icon type="bell" style={{fontSize: 16, padding: 4}}/>
            </Badge>
        </Popover>;
    }
}
