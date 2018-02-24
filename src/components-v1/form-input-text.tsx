/**
 * FormInputText 输入控件
 * Created by Handy
 * */
import * as React from 'react';
import {Input} from 'antd';
const { TextArea } = Input;
import {TextAreaProps} from "antd/lib/input";

interface FormInputTextProps extends TextAreaProps {
    readonly?: boolean;
    rows?: number;
}

interface FormInputTextStates {
}

export class FormInputText extends React.Component<FormInputTextProps, FormInputTextStates> {
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const topThis = this;
        const {props: {readonly, value, rows, ...otherProps}} = topThis;
        return !readonly ? <TextArea value={value} rows={rows ? rows : 4} {...otherProps}></TextArea> :
            <label>{value}</label>;
    }
}