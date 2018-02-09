import * as React from 'react';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';
import DeliveredDetailForm from "./delivered-detail-form";

export interface FormDeliveredDetailProps extends FormComponentProps{
    readOnly?: boolean;
    value?: ModelNameSpace.FormDeliveredModel;
}

export interface FormDeliveredDetailStates {
    value?: ModelNameSpace.FormDeliveredModel;
}

export class FormDeliveredDetail extends React.Component<FormDeliveredDetailProps, FormDeliveredDetailStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            value: {
                agentID: 0,
                agentName: "",
                channelNo: ""
            }
        }
    }

    render() {
        const topThis = this;
        const {props: {readOnly}} = topThis;

        return <FormSettingGroup title={"出库明细"}>
            <DeliveredDetailForm type={readOnly ? "view" : "edit"}></DeliveredDetailForm>
        </FormSettingGroup>
    }
}