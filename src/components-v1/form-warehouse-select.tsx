/**
 * 仓库下拉选择
 * Created by Handy
 * */
import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;
import {APINameSpace} from '../model/api';

interface FormWarehouseSelectProps extends SelectProps{
    readonly?: boolean;
    value?: LabeledValue
}

interface FormWarehouseSelectStates {
    selectData?:LabeledValue[]
}

export class FormWarehouseSelect extends React.Component<FormWarehouseSelectProps, FormWarehouseSelectStates> {
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
        let data:LabeledValue[];
        APINameSpace.WarehouseAPI.GetWareHouseAll().then((result) =>{
            if (result.Data !== null && result.Status === 0){
                data = result.Data.map(o =>({
                    key:o.ID,
                    label:o.code
                }));
                topThis.setState({selectData: data});
            }
        })
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
        const {props:{readonly,value,...otherProps}} = topThis;
        return !readonly ?<Select labelInValue value={value} {...otherProps} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {topThis.renderOption()}
        </Select>:<label>{!isNullOrUndefined(value)?value.label:""}</label>;
    }
}