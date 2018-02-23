import * as React from "react";
import {Component} from "react";
import {Form, Button, Row, Col,InputNumber,Input} from 'antd';
const FormItem=Form.Item;
const { TextArea } = Input;
import {ColProps} from "antd/lib/col";
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormControl} from '../components-v1/form-control';
import {SelectType} from "../util/common";
import {ModelNameSpace} from '../model/model';
import {FormExpressSelect} from "./form-express-select";
import {FormWarehouseSelect} from "./form-warehouse-select";
import {FormStatusSelect} from "./form-status-select";

export interface WarehouseInFormProps extends FormComponentProps {
    /** 点击提交*/
    onSubmit?: (values: any) => void;
    /** Data*/
    Data?: ModelNameSpace.WarehouseListModel;
    /** 类型*/
    type?: 'add' | 'edit' | 'view'
}

export interface WarehouseInFormStates {

}

class WarehouseInForm extends Component<WarehouseInFormProps, WarehouseInFormStates> {
    constructor(props, context) {
        super(props, context);
    }

    /** 点击确认*/
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

    componentDidMount() {
        const topThis = this;
        const {props: {Data, type, form: {setFieldsValue}}} = topThis;
        switch (type) {
            default:
                setFieldsValue({
                    /** 会员*/
                    user: [{key: Data.userid, label: Data.MemeberCode}],
                    /** 快递方式*/
                    expressType: {key: Data.expressTypeID, label: Data.expressTypeName},
                    expressNo: Data.expressNo,
                    /** 入库状态*/
                    inWareHouseStatus: Data.currentStatus,
                    /** 件数*/
                    inPackageCount: Data.InPackageCount,
                    inWeight: Data.InWeight,
                    inLength: Data.InLength,
                    inWidth: Data.InWidth,
                    inHeight: Data.InHeight,
                    /** 交接单*/
                    transferNo: Data.TransferNo,
                    /** 备注*/
                    warehouseAdminRemark: Data.WarehouseAdminRemark,
                    /** 客服*/
                    customerService: [{key: Data.CustomerServiceID, label: Data.CustomerServiceName}],
                    /** 仓库*/
                    wareHouse: {key: Data.WareHouseID, label: Data.WareHouseName}
                });
                break;
        }
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}, type}} = topThis;

        /** 控件栅格*/
        const spanLayout:ColProps = {
            xs: 24,
            sm: 12,
            md: 8
        }

        /** 是否必填*/
        const required = type === "view" ? false : true;

        /** 是否只读*/
        const disabled = type === "view" ? true : false;

        /** vertical布局样式BUG --- 请勿移动控件顺序*/
        return (
            <Form className="warehouse-in-add-form" layout={"vertical"}
                  onSubmit={topThis.onSubmit.bind(this)}>
                <Row gutter={16}>
                    <Col {...spanLayout}>
                        <FormItem label={"快递方式"}>
                            {getFieldDecorator("expressType", {
                                rules: [{required: required, message: '请选择快递方式!'}],
                            })(<FormExpressSelect disabled={disabled} placeholder="快递方式"></FormExpressSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"快递单号"}>
                            {getFieldDecorator("expressNo", {
                                rules: [{required: required, message: '请选择快递单号!'}],
                            })(<Input disabled={disabled} placeholder="快递单号"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"仓库"}>
                            {getFieldDecorator("wareHouse", {
                                rules: [{required: required, message: '请选择仓库!'}],
                            })(<FormWarehouseSelect disabled={disabled} placeholder="仓库"></FormWarehouseSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"初始重量"}>
                            {getFieldDecorator("inWeight", {
                                rules: [{required: required, message: '请填写重量!'}],
                            })(<InputNumber disabled={disabled} style={{width: '100%'}} placeholder="初始重量"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"初始体积"}>
                            <Row gutter={8} type="flex" justify="center" align="top">
                                <Col span={8}>
                                    {getFieldDecorator('inLength', {
                                        rules: [{required: required, message: '请填写长度!'}],
                                    })(<InputNumber disabled={disabled} style={{width: '100%'}} min={0}
                                                        placeholder="长（cm）"/>)}
                                </Col>
                                <Col span={8}>
                                    {getFieldDecorator('inWidth', {
                                        rules: [{required: required, message: '请填写宽度!'}],
                                    })(<InputNumber disabled={disabled} style={{width: '100%'}} min={0}
                                                        placeholder="宽（cm）"/>)}
                                </Col>
                                <Col span={8}>
                                    {getFieldDecorator('inHeight', {
                                        rules: [{required: required, message: '请填写高度!'}],
                                    })(<InputNumber disabled={disabled} style={{width: '100%'}} min={0}
                                                        placeholder="高（cm）"/>)}
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"件数"}>
                            {getFieldDecorator("inPackageCount", {
                                rules: [{required: required, message: '请填写件数!'}],
                            })(<InputNumber disabled={disabled} style={{width: '100%'}} placeholder="件数"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"入库状态"}>
                            {getFieldDecorator("inWareHouseStatus", {
                                rules: [{required: required, message: '请选择状态!'}],
                            })(<FormStatusSelect disabled={disabled} dataType={ModelNameSpace.OrderTypeEnum.WarehouseIn}
                                                 placeholder="入库状态"></FormStatusSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"会员"}>
                            {getFieldDecorator("user", {
                                rules: [{required: required, message: '请选择会员!'}],
                            })(<FormControl.FormSelectIndex disabled={disabled} type={SelectType.Member}
                                                            placeholder="会员"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"客服"}>
                            {getFieldDecorator("customerService", {
                                rules: [{required: required, message: '请选择客服!'}],
                            })(<FormControl.FormSelectIndex disabled={disabled} type={SelectType.CustomerService}
                                                            placeholder="客服"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem label={"交接单"}>
                            {getFieldDecorator("transferNo")(<Input disabled={disabled} placeholder="交接单"/>)}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem label={"备注"}>
                            {getFieldDecorator("warehouseAdminRemark")(<TextArea disabled={disabled} rows={4}></TextArea>)}
                        </FormItem>
                    </Col>
                </Row>
                {!disabled ? <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button style={{marginLeft: 8}}>取消</Button>
                    </Col>
                </Row> : null}
            </Form>
        );
    }
}

export default Form.create<any>()(WarehouseInForm);