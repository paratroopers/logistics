/**
 * 状态下拉选择
 * Created by Handy
 * */
import * as React from 'react';
import {Select} from 'antd';
import {SelectProps,LabeledValue} from "antd/lib/select";
import {isNullOrUndefined} from "util";
const Option = Select.Option;

interface FormStatusSelectProps extends SelectProps{}

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
        const data: LabeledValue[] = [{
            key: "0",
            label: "待打包"
        }, {
            key: "1",
            label: "客服确认"
        }, {
            key: "2",
            label: "仓库打包"
        }, {
            key: "3",
            label: "待付款"
        }, {
            key: "4",
            label: "待发货"
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
        return <Select {...otherProps}>
            {topThis.renderOption()}
        </Select>;
    }
}