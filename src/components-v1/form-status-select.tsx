/**
 * 状态下拉选择
 * Created by Handy
 * */
import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;
import {ModelNameSpace} from '../model/model';

interface FormStatusSelectProps extends SelectProps {
    dataType?: ModelNameSpace.OrderTypeEnum;
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
        const {props:{dataType}}=topThis;
        const data: LabeledValue[] = [];
        switch(dataType){
            case ModelNameSpace.OrderTypeEnum.WarehouseIn:
                data.push({key: "0",label: "未确认"});
                data.push({key: "1",label: "已确认"});
                data.push({key: "2",label: "仓库退货"});
                break;
            case ModelNameSpace.OrderTypeEnum.WarehousePackage:
                data.push({key: "0",label: "未确认"});
                data.push({key: "1",label: "已确认"});
                data.push({key: "2",label: "客服退货"});
                data.push({key: "3",label: "客服拒绝"});
                break;
            case ModelNameSpace.OrderTypeEnum.CustomerConfirm:
                data.push({key: "0",label: "未确认"});
                data.push({key: "1",label: "已确认"});
                break;
            case ModelNameSpace.OrderTypeEnum.CustomerPayment:
                data.push({key: "0",label: "未确认"});
                data.push({key: "1",label: "已付款"});
                data.push({key: "2",label: "付款失败"});
                break;
            case ModelNameSpace.OrderTypeEnum.WaitForDelivered:
                data.push({key: "0",label: "未发货"});
                data.push({key: "1",label: "已发货"});
                break;
            default:
                data.push({key: "0",label: "待打包"});
                data.push({key: "1",label: "客服确认"});
                data.push({key: "2",label: "仓库打包"});
                data.push({key: "3",label: "待付款"});
                data.push({key: "4",label: "待发货"});
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
        const {props:{...otherProps}} = topThis;
        return <Select {...otherProps}>
            {topThis.renderOption()}
        </Select>;
    }
}