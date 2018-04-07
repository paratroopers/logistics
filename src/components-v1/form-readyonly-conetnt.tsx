import * as React from 'react';
import {Row, Col} from 'antd';

export interface ReadyOnlyContentItemModel {
    lableCol?: number;
    conetntCol?: number;
    lable?: string;
    conetent?: any;
}
export function FormReadyOnlyContent(data: ReadyOnlyContentItemModel): any {
    const {lableCol, lable, conetntCol, conetent} = data;
    return [
        <Col span={lableCol - 2} style={{textAlign: 'left'}}>
            {lable}:
        </Col>,
        <Col span={conetntCol}>
            {conetent}
        </Col>,
        <Col span={2}>
        </Col>
    ]
}