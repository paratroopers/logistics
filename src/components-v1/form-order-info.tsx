import * as React from 'react';
import {Row, Col} from 'antd';
import {FormSettingGroup} from './form-setting-group';
import {FormReadyOnlyContent, ReadyOnlyContentItemModel} from './form-readyonly-conetnt';
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

    renderContent(label?: string, content?: any, lableCol?: number, contentCol?: number) {
        const readyOnlyData: ReadyOnlyContentItemModel = {
            conetent: content,
            lable: label,
            lableCol: lableCol,
            conetntCol: contentCol,
        };
        return FormReadyOnlyContent(readyOnlyData);
    }

    render() {
        const {state: {data}, props: {loading}} = this;
        return <FormSettingGroup title={"订单基本信息"} loading={loading}>
            <Row className="form-order-info">
                {this.renderContent('净重量', data.weight, 6, 6)}
                {this.renderContent('净重体积', data.volume, 8, 4)}
                {this.renderContent('总件数', data.count, 6, 6)}
                <Col span={24}>{this.renderContent('创建时间', moment(data.created).format('YYYY-MM-DD HH:mm'), 8, 16)}</Col>
            </Row>
        </FormSettingGroup>
    }
}