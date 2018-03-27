/**
 * 返回按钮
 * Created by Handy
 * */
import * as React from 'react';
import {Button} from "antd";
import {hashHistory} from 'react-router';


interface FormButtonCancelProps {
    url?:string;
}

interface FormButtonCancelPropsStates {
}

export default class FormButtonCancel extends React.Component<FormButtonCancelProps, FormButtonCancelPropsStates> {
    constructor(props, content) {
        super(props, content);
    }

    returnUrl() {
        if(this.props.url !== '')
        {
            hashHistory.push(this.props.url);

        }else {
            hashHistory.goBack();
        }

    }

    render() {

        return <Button type="primary" onClick={this.returnUrl.bind(this)}>取消</Button>;
    }
}