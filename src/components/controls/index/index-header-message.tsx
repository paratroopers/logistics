import * as React from 'react';
import {Row, Col, Popover,Avatar,Icon,Badge} from 'antd';

interface HeaderMessageProps {

}

interface HeaderMessageStates {

}

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    },
    {
        title: 'Ant Design Title 4',
    },
];


export class HeaderMessage extends React.Component<HeaderMessageProps, HeaderMessageStates> {
    constructor(props, context) {
        super(props, context);
    }


    renderContent(){
        return <div>11111111</div>
    }

    render() {
        const topThis = this;
        return <Popover placement="bottomRight"
                        overlayClassName="tool-user-popover"
                        autoAdjustOverflow={true}
                        content={topThis.renderContent()}
                        trigger="click">
            <Badge count={99}>
                <Icon type="bell" style={{fontSize:16,padding:4}}/>
            </Badge>
        </Popover>;
    }
}
