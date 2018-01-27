import * as React from 'react';
import {Row, Col} from 'antd';
import {FormSettingTitle} from './form-setting-title'

export interface FormOrderInfoProps {
    title?: string;
    size?: number;
}

export interface FormOrderInfoStates {

}

export class FormOrderInfo extends React.Component<FormOrderInfoProps, FormOrderInfoStates> {

    render() {
        return <div className="form-control-group">
            <Row className="orderinfo">
                <Col>
                    <FormSettingTitle size={16} title={"订单基本信息"}></FormSettingTitle>
                </Col>
                <Col>
                    <span>创建时间 2018-01-27</span>
                    <span>净重量 15KG</span>
                    <span>净重体积 12cm²</span>
                    <span>总件数 10</span>
                </Col>
            </Row>
        </div>
    }
}