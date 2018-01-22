/**
 * 仓库下拉选择
 * Created by Handy
 * */
import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;

interface FormWarehouseSelectProps extends SelectProps{}

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
        const data: LabeledValue[] = [{
            key: "0",
            label: "仓库A"
        }, {
            key: "1",
            label: "仓库B"
        }, {
            key: "2",
            label: "仓库C"
        }, {
            key: "3",
            label: "仓库D"
        }, {
            key: "4",
            label: "仓库E"
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