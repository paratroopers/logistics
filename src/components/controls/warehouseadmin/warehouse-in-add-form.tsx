import * as React from "react";
import {Component} from "react";
import {Form, Button, Row, Col,InputNumber,Input} from 'antd';
const FormItem=Form.Item;
const { TextArea } = Input;
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormControl} from '../../../page/demo/enzodemo';
import {SelectType} from "../../../util/common";
import {FormStatusSelect,FormExpressSelect,FormWarehouseSelect} from "../../form/index";
import {OrderTypeEnum}from "../../../api/model/common";

export interface WarehouseInAddFormProps extends FormComponentProps {
    /** 点击提交*/
    onSubmit?: (values:any) => void;
}

export interface WarehouseInAddFormStates {

}

class WarehouseInAddForm extends Component<WarehouseInAddFormProps, WarehouseInAddFormStates> {
    constructor(props, context) {
        super(props, context);
    }

    /** 点击搜索*/
    onSubmit = (e) => {
        e.preventDefault();
        const topThis = this;
        const {props: {onSubmit}} = topThis;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (onSubmit)
                    onSubmit(values);
            }
        });
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}}} = topThis;
        const spanLayout = {
            xs: 24,
            sm: 12,
            md: 12,
            lg: 8,
            xl: 8
        }

        return (
            <Form className="warehouse-in-add-form" layout={"vertical"}
                  onSubmit={topThis.onSubmit.bind(this)}>
                <Row gutter={16}>
                    <Col {...spanLayout}>
                        <FormItem label={"会员"}>
                            {getFieldDecorator("user", {
                                rules: [{required: true, message: '请选择会员!'}],
                            })(<FormControl.FormSelectIndex type={SelectType.Member} placeholder="会员"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"物流方式"}>
                            {getFieldDecorator("expressType", {
                                rules: [{required: true, message: '请选择物流方式!'}],
                            })(<FormExpressSelect placeholder="物流方式"></FormExpressSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"快递单号"}>
                            {getFieldDecorator("expressNo", {
                                rules: [{required: true, message: '请选择快递单号!'}],
                            })(<FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="快递单号"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"客服"}>
                            {getFieldDecorator("customerService", {
                                rules: [{required: true, message: '请选择客服!'}],
                            })(<FormControl.FormSelectIndex type={SelectType.CustomerService} placeholder="客服"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"仓库"}>
                            {getFieldDecorator("wareHouse", {
                                rules: [{required: true, message: '请选择仓库!'}],
                            })(<FormWarehouseSelect placeholder="仓库"></FormWarehouseSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"入库状态"}>
                            {getFieldDecorator("inWareHouseStatus", {
                                rules: [{required: true, message: '请选择状态!'}],
                            })(<FormStatusSelect dataType={OrderTypeEnum.WarehouseIn} placeholder="入库状态"></FormStatusSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"件数"}>
                            {getFieldDecorator("inPackageCount", {
                                rules: [{required: true, message: '请填写件数!'}],
                            })(<InputNumber style={{width: '100%'}} placeholder="件数"></InputNumber >)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"初始重量"}>
                            {getFieldDecorator("inWeight", {
                                rules: [{required: true, message: '请填写重量!'}],
                            })(<InputNumber style={{width: '100%'}} placeholder="初始重量"></InputNumber >)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"初始体积"}>
                            <Row gutter={8} type="flex" justify="center" align="top">
                                <Col span={8}>
                                    {getFieldDecorator('inLength', {
                                        rules: [{required: true, message: '请填写长度!'}],
                                    })(<InputNumber min={0} placeholder="长（cm）"/>)}
                                </Col>
                                <Col span={8}>
                                    {getFieldDecorator('inWidth', {
                                        rules: [{required: true, message: '请填写宽度!'}],
                                    })(<InputNumber min={0} placeholder="宽（cm）"/>)}
                                </Col>
                                <Col span={8}>
                                    {getFieldDecorator('inHeight', {
                                        rules: [{required: true, message: '请填写高度!'}],
                                    })(<InputNumber min={0} placeholder="高（cm）"/>)}
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"交接单"}>
                            {getFieldDecorator("transferNo", {
                                rules: [{required: true, message: '请填写交接单!'}],
                            })(<Input placeholder="交接单"></Input >)}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label={"备注"}>
                            {getFieldDecorator("warehouseAdminRemark")(<TextArea rows={4}></TextArea>)}
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button style={{marginLeft: 8}}>取消</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default Form.create<any>()(WarehouseInAddForm);