/**
 * 数字输入控件
 * Created by Handy
 * */
import * as React from 'react';
import {InputNumber} from 'antd';
import {InputNumberProps} from "antd/lib/input-number";

interface FormInputNumberProps extends InputNumberProps {
    readonly?: boolean;
    suffixText?: string;
    prefixText?: string;
}

interface FormInputNumberStates {
}

export class FormInputNumber extends React.Component<FormInputNumberProps, FormInputNumberStates> {
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const topThis = this;
        const {props: {readonly, value, suffixText, prefixText, ...otherProps}} = topThis;
        return !readonly ? <InputNumber value={value} {...otherProps}></InputNumber> :
            <label
                style={{display: "inline-block"}}>{prefixText ? prefixText : ""}{value}{suffixText ? suffixText : ""}</label>;
    }
}