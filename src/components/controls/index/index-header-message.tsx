import * as React from 'react';
import {Row, Col, Popover,Avatar,Icon} from 'antd';

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


    renderUserNameContent(){
        return <div></div>
    }

    render() {
        const topThis = this;
        return <Popover placement="bottomRight"
                        autoAdjustOverflow={true}
                        content={topThis.renderUserNameContent()}
                        trigger="click">
            <Icon type="bell" />
        </Popover>;
    }
}
