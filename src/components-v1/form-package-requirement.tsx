import * as React from 'react';
import {Row,Col,Input} from 'antd';
import {FormSettingGroup} from './form-setting-group';

export interface FormPackageRequirementProps {
    readOnly?: boolean;
    value?: string;
    onChange?: (v: string) => void;
}

export interface FormPackageRequirementStates {

}

export class FormPackageRequirement extends React.Component<FormPackageRequirementProps, FormPackageRequirementStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const topThis = this;
        const {props: {value, onChange, readOnly}} = topThis;
        return <FormSettingGroup title={"打包要求"}>
            <Row>
                <Col span={24} style={{marginBottom: 12}}>备注：</Col>
                <Col span={24} style={{marginBottom: 24}}>
                    {!readOnly ? <Input.TextArea value={value} onChange={(e) => {
                        onChange(e.target.value);
                    }} placeholder={''}></Input.TextArea> : <span>{value}</span>}
                </Col>
            </Row>
        </FormSettingGroup>
    }
}