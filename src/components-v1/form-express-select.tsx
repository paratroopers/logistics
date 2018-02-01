/**
 * 快递方式下拉选择
 * Created by Handy
 * */
import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;
import {APINameSpace} from '../model/api';

interface FormExpressSelectProps extends SelectProps{}

interface FormExpressSelectStates {
    selectData?:LabeledValue[]
}

export class FormExpressSelect extends React.Component<FormExpressSelectProps, FormExpressSelectStates> {
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
        APINameSpace.SystemAPI.GetExpressTypeAll().then((result) =>{
            if (result.Data !== null && result.Status === 0){
                    data = result.Data.map(o =>({
                    key:o.ID,
                    label:o.Name
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
        const {props:{...otherProps}} = topThis;
        return <Select labelInValue {...otherProps} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {topThis.renderOption()}
        </Select>;
    }
}