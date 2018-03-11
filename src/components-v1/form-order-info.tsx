import * as React from 'react';
import {Row, Col} from 'antd';
import {FormSettingGroup} from './form-setting-group'
import * as moment from 'moment';

export interface FormOrderInfoProps {
    title?: string;
    size?: number;
    data?: FormOrderInfoModel;
    loading?: boolean;
}

export interface FormOrderInfoStates {
    data?: FormOrderInfoModel;
}

export interface FormOrderInfoModel {
    created?: string;
    weight?: number;
    volume?: number;
    count?: number;
}

export class FormOrderInfo extends React.Component<FormOrderInfoProps, FormOrderInfoStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : {}
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    render() {
        const {state: {data}, props: {loading}} = this;
        return <FormSettingGroup title={"订单基本信息"} loading={loading}>
            <Row className="form-order-info">
                <Row>
                    <Col xl={6} md={24}>
                        <span className="order-content-key">创建时间</span>
                        <span className="order-content-value">{moment(data.created).format('YYYY-MM-DD HH:mm')}</span>
                    </Col>
                    <Col xl={6} md={24}>
                        <span className="order-content-key">净重量</span>
                        <span className="order-content-value">{data.weight}kg</span>
                    </Col>
                    <Col xl={6} md={24}>
                        <span className="order-content-key">净重体积</span>
                        <span className="order-content-value">{data.volume}cm³</span>
                    </Col>
                    <Col xl={6} md={24}>
                        <span className="order-content-key">总件数</span>
                        <span className="order-content-value">{data.count}</span>
                    </Col>
                </Row>
            </Row>
        </FormSettingGroup>
    }
}