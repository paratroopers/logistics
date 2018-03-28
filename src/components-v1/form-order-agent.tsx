import * as React from 'react';
import {Row, Col, Form, Input} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormSettingGroup} from './form-setting-group'
import {FormControl} from '../components-v1/form-control';
import {SelectType} from "../util/common";
import {ModelNameSpace} from '../model/model';

export interface FormOrderAgentProps extends FormComponentProps {
    readyOnly?: boolean;
    data?: ModelNameSpace.CustomerOrderMergeModel;
}

export interface FormOrderAgentStates {
}


export default class FormOrderAgent extends React.Component<FormOrderAgentProps, FormOrderAgentStates> {
    constructor(props, context) {
        super(props, context);
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data && this.props.form) {
            this.props.form.setFieldsValue({agent: nextProps.data.AgentID, channelNo: nextProps.data.channelNo});
        }
    }

    renderFormIndexControl(isDis?: boolean, val?: any) {
        return <FormControl.FormSelectIndex type={SelectType.Agent}
                                            mode="default"
                                            defaultValue={val}
                                            disabled={isDis}
                                            noLabelInValue={true}
                                            placeholder="代理商"/>;
    }

    render() {
        const {props: {form, readyOnly, data}} = this;
        if (readyOnly && !data) return null;
        return <FormSettingGroup title={"代理商选择"}>
            <Form>
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={8} style={{paddingLeft: '8px'}}>
                        <Form.Item required={!readyOnly}>
                            {readyOnly ? this.renderFormIndexControl(true, data.AgentID) :
                                form.getFieldDecorator("agent", {
                                    initialValue: 'AgentID',
                                    rules: [{required: true, message: '请选择代理商!'}],
                                })(<FormControl.FormSelectIndex type={SelectType.Agent}
                                                                mode="default"
                                                                noLabelInValue={true}
                                                                placeholder="代理商"/>)}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={8} style={{paddingLeft: '8px'}}>
                        <Form.Item required={!readyOnly}>
                            {readyOnly ?
                                <Input disabled value={data.channelNo}></Input> : form.getFieldDecorator("channelNo", {
                                    initialValue: 'channelNo',
                                    rules: [{required: true, message: '请输入渠道单号!'}],
                                })(<Input placeholder="请输入渠道单号"/>)}
                        </Form.Item>
                    </Col>

                </Row>
            </Form>
        </FormSettingGroup>
    }
}