/**
 * Input 输入控件
 * Created by Handy
 * */
import * as React from 'react';
import {Input} from 'antd';
import {InputProps} from "antd/lib/input";

interface FormInputProps extends InputProps {
    readonly?:boolean;
}

interface FormInputStates {
}

export class FormInput extends React.Component<FormInputProps, FormInputStates> {
    constructor(props, content) {
        super(props, content);
    }

    render() {
        const topThis = this;
        const {props: {readonly, value, ...otherProps}} = topThis;
        return !readonly ? <Input value={value} {...otherProps}></Input> : <label>{value}</label>;
    }
}