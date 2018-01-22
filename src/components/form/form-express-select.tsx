/**
 * 快递方式下拉选择
 * Created by Handy
 * */
import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;

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
        const data: LabeledValue[] = [{
            key: "0",
            label: "顺丰快递"
        }, {
            key: "1",
            label: "菜鸟快递"
        }, {
            key: "2",
            label: "圆通快递"
        }, {
            key: "3",
            label: "韵达快递"
        }, {
            key: "4",
            label: "天天快递"
        }]

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
        return <Select {...otherProps} showSearch optionFilterProp="children" filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0}>
            {topThis.renderOption()}
        </Select>;
    }
}