import * as React from 'react';
import {Spin} from 'antd';
import {FormSettingGroup} from './form-setting-group'

export interface FormOrderInfoProps {
    title?: string;
    size?: number;
    data?: FormOrderInfoModel;
    loading?: boolean;
}

export interface FormOrderInfoStates {
    data?: FormOrderInfoModel;
    loading?: boolean;
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
            data: props.data ? props.data : {},
            loading: props.loading ? props.loading : true,
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data, loading: false});
        }
    }

    render() {
        const {state: {data, loading}} = this;
        return <FormSettingGroup loading={loading} size={16} title={"订单基本信息"} span={24}>
            <div className="orderinfo">
                <span>创建时间: {data.created}</span>
                <span> 净重量 : <a>{data.weight}</a>kg</span>
                <span>净重体积: {data.volume}cm²</span>
                <span>总件数: <a>{data.count}</a></span>
            </div>
        </FormSettingGroup>
    }
}