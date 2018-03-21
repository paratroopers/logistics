import * as React from "react";
import {Component} from "react";
import {Form, Row, Col, Input} from 'antd';

const FormItem = Form.Item;
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormControl} from '../components-v1/form-control';
import {SelectType} from "../util/common";
import {ModelNameSpace} from '../model/model';

export interface DeliveredDetailFormProps extends FormComponentProps {
    /** Data*/
    Data?: ModelNameSpace.FormDeliveredModel;
    /** 类型*/
    type: 'edit' | 'view'
}

export interface DeliveredDetailFormStates {

}

class DeliveredDetailForm extends Component<DeliveredDetailFormProps, DeliveredDetailFormStates> {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}, type}} = topThis;

        /** 控件栅格*/
        const spanLayout = {
            xs: 24,
            sm: 12,
            md: 8
        }

        /** 是否必填*/
        const required = type === "view" ? false : true;

        /** 是否只读*/
        const disabled = type === "view" ? true : false;

        /** 表单布局*/
        const formLayout = "horizontal";
        const formItemLayout = formLayout === 'horizontal' ? {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        } : null;

        return (
            <Form className="delivered-detail-form" layout={formLayout}>
                <Row gutter={16}>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"代理商"}>
                            {getFieldDecorator("agent", {
                                rules: [{required: required, message: '请选择代理商!'}],
                            })(<FormControl.FormSelectIndex disabled={disabled} type={SelectType.Agent}
                                                            placeholder="代理商"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"渠道单号"}>
                            {getFieldDecorator("channelNo", {
                                rules: [{required: required, message: '请填写渠道单号!'}],
                            })(<Input disabled={disabled} placeholder="渠道单号"/>)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create<any>()(DeliveredDetailForm);