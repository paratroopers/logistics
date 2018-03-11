import * as React from 'react';
import {Row, Col, Input} from 'antd';
import {FormSettingGroup} from './form-setting-group';

export interface FormRemarksProps {
    readOnly?: boolean;
    value?: string;
    onChange?: (v: string) => void;
    title?: string;
    minRows?: number;
}

export interface FormRemarksStates {
    value?: string;
}

export class FormRemarks extends React.Component<FormRemarksProps, FormRemarksStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
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
        const {props: {onChange, readOnly, title, minRows}, state: {value}} = topThis;
        return <FormSettingGroup title={title ? title : "备注"}>
            <Row className="form-remarks">
                {!readOnly ? <Col span={24} style={{marginBottom: 12}}>备注：</Col> : null}
                <Col span={24} style={{marginBottom: 24}}>
                    {!readOnly ?
                        <Input.TextArea autosize={{minRows: minRows ? minRows : 6}} value={value} onChange={(e) => {
                            const v = e.target.value;
                            topThis.setState({value: v}, () => {
                                if (onChange)
                                    onChange(v);
                            })
                        }} placeholder={''}></Input.TextArea> :<span>{value}</span>}
                </Col>
            </Row>
        </FormSettingGroup>
    }
}