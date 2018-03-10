/**
 * 状态下拉选择
 * */

import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;
import {ModelNameSpace} from '../model/model';
import {Constants} from "../util/common";

interface FormStatusSelectProps extends SelectProps {
    type?: ModelNameSpace.OrderTypeEnum;
    readonly?:boolean;
    value?: string;
}

interface FormStatusSelectStates {
    selectData?:LabeledValue[]
}

export class FormStatusSelect extends React.Component<FormStatusSelectProps, FormStatusSelectStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            selectData: []
        }
    }

    componentDidMount() {
        this.onLoadData();
    }

    /** 获取数据源*/
    onLoadData() {
        const topThis = this;
        const {props:{type}}=topThis;
        const {OrderTypeEnum, OrderStatusEnum} = ModelNameSpace;
        const data: LabeledValue[] = [];
        switch(type){
            case OrderTypeEnum.OrderIn:
                data.push({key: OrderStatusEnum.StatusA.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.OrderIn,OrderStatusEnum.StatusA)});
                data.push({key: OrderStatusEnum.StatusB.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.OrderIn,OrderStatusEnum.StatusB)});
                data.push({key: OrderStatusEnum.StatusC.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.OrderIn,OrderStatusEnum.StatusC)});
                break;
            case OrderTypeEnum.WaitApprove:
                data.push({key: OrderStatusEnum.StatusB.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.WaitApprove,OrderStatusEnum.StatusB)});
                data.push({key: OrderStatusEnum.StatusC.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.WaitApprove,OrderStatusEnum.StatusC)});
                break;
            case OrderTypeEnum.OrderOut:
                data.push({key: OrderStatusEnum.StatusA.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.OrderOut,OrderStatusEnum.StatusA)});
                data.push({key: OrderStatusEnum.StatusB.toString(),label: Constants.getOrderStatusByEnum(OrderTypeEnum.OrderOut,OrderStatusEnum.StatusB)});
                break;
            default:
                break;
        }
        topThis.setState({selectData: data});
    }

    renderOption() {
        const topThis = this;
        const {state: {selectData}} = topThis;
        const options = [];
        if (!isNullOrUndefined(selectData)) {
            selectData.map(function (item, index) {
                options.push(<Option value={item.key} key={index}>{item.label}</Option>);
            })
        }
        return options;
    }

    render() {
        const topThis = this;
        const {props:{value,readonly,...otherProps},state:{selectData}} = topThis;
        let labelText="";
        if(readonly) {
            selectData.map((item) => {
                if (item.key === value)
                    labelText = item.label.toString();
            })
        }
        return !readonly ?<Select allowClear={true} value={value} {...otherProps}>
            {topThis.renderOption()}
        </Select>: <label style={{width: '100%'}}>{value ? labelText : ""}</label>;
    }
}