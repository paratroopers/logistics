import * as React from 'react';
import {Row, Col, Icon} from "antd";

export interface FormTableHeaderProps {
    totalCount?: number;
    buttonGroup?: any;
}
export interface FormTableHeaderStates {
}

export class FormTableHeader extends React.Component<FormTableHeaderProps, FormTableHeaderStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {props: {buttonGroup, totalCount}} = this;
        return <Row>
            <Col span={24} className="order-title">
                {buttonGroup}
                <span className="order-count">
                    <Icon type="info-circle" style={{color: '#0193e4'}}></Icon>
                    {`总计有${totalCount}项 待打包订单`}
                </span>
            </Col>
        </Row>
    }
}