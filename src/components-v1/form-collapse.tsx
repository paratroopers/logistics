/**
 * 折叠面板
 * Created by Handy
 * */
import * as React from 'react';
import {Collapse} from 'antd';
const Panel = Collapse.Panel;

interface FormCollapseProps {
    header?: React.ReactNode;
    bordered?:boolean;
    panelStyle?:React.CSSProperties;
}

interface FormCollapseStates {}

export class FormCollapse extends React.Component<FormCollapseProps, FormCollapseStates> {
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const topThis = this;
        const {props: {children, header, bordered, panelStyle}} = topThis;

        const customPanelStyle: React.CSSProperties = {
            background: '#FFFFFF',
            marginBottom: 24,
            border: 0,
            overflow: 'hidden',
        };

        return <Collapse defaultActiveKey={['0']} bordered={bordered ? bordered : false}  className="form-collapse">
            <Panel key="0" header={header ? header : "Header"} style={panelStyle ? panelStyle : customPanelStyle}>
                {children}
            </Panel>
        </Collapse>;
    }
}