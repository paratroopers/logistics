import * as React from 'react';
import {Row,Col,Input} from 'antd';
import {FormSettingGroup} from './form-setting-group';

export interface FormPackageRequirementProps {
    readOnly?: boolean;
    value?: string;
    onChange?: (v: string) => void;
}

export interface FormPackageRequirementStates {
    value?:string;
}

export class FormPackageRequirement extends React.Component<FormPackageRequirementProps, FormPackageRequirementStates> {
    constructor(props, context) {
        super(props, context);
        this.state= {
            value: props.value ? props.value : ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value !== this.props.value) {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        const topThis = this;
        const {props: { onChange, readOnly},state:{value}} = topThis;
        return <FormSettingGroup title={"打包要求"}>
            <Row>
                <Col span={24} style={{marginBottom: 12}}>备注：</Col>
                <Col span={24} style={{marginBottom: 24}}>
                    {!readOnly ? <Input.TextArea value={value} onChange={(e) => {
                        const v=e.target.value;
                        topThis.setState({value:v},()=>{
                            if(onChange)
                                onChange(v);
                        })
                    }} placeholder={''}></Input.TextArea> : <span>{value}</span>}
                </Col>
            </Row>
        </FormSettingGroup>
    }
}