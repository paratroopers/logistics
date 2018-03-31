import * as React from "react";
import {hashHistory} from 'react-router';
import {Component} from "react";
import {Form, Button, Row, Col} from 'antd';
import {ColProps} from "antd/lib/col";
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormControl} from '../components-v1/form-control';
import {FormUpload} from '../components-v1/form-upload';
import {SelectType} from "../util/common";
import {ModelNameSpace} from '../model/model';
import {RequestNameSpace} from '../model/request';
import {APINameSpace} from '../model/api';
import {ResponseNameSpace} from '../model/response';
import {FormExpressSelect} from "./form-express-select";
import {FormWarehouseSelect} from "./form-warehouse-select";
import {FormStatusSelect} from "./form-status-select";
import {FormInput} from "./form-input";
import {FormInputNumber} from "./form-input-number";
import {FormInputText} from "./form-input-text";
import {Constants} from '../util/common';
import * as moment from 'moment';
import {isNullOrUndefined} from "util";
const FormItem = Form.Item;

export interface WarehouseInFormProps extends FormComponentProps {
    /** 点击提交*/
    onSubmit?: (values: any) => void;
    /** 数据源主键*/
    ID?: string;
    /** 类型*/
    type?: 'add' | 'edit' | 'view' | 'modal' | 'query';
    style?: React.CSSProperties;
}

export interface WarehouseInFormStates {
    files?: string[];
    dataSource?: ModelNameSpace.WarehouseListModel;
}

class WarehouseInForm extends Component<WarehouseInFormProps, WarehouseInFormStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            files: []
        }
    }

    initData() {
        const topThis = this;
        const {props: {ID}} = topThis;

        if (isNullOrUndefined(ID))
            return;

        /** 查询详情信息*/
        const request: RequestNameSpace.GetCustomerOrderItemRequest = {
            customerOrderID: ID,
            isAdmin: false
        }

        APINameSpace.CustomerOrderAPI.GetCustomerOrderItem(request).then((r: ResponseNameSpace.GetCustomerOrderItemResponse) => {
            if (r.Status === 0) {
                topThis.setState({dataSource: {...r.Data.customerOrder}}, () => {
                    topThis.initDataFormat();
                });
            }
        });
    }

    /** 点击确认*/
    onSubmit = (e) => {
        e.preventDefault();
        const topThis = this;
        const {props: {onSubmit}} = topThis;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (onSubmit)
                    onSubmit(Object.assign({}, values, {AttachmentIDList: this.state.files}));
            }
        });
    }

    initDataFormat() {
        const topThis = this;
        const {props: {type, form: {setFieldsValue}}, state: {dataSource}} = topThis;
        switch (type) {
            case"add":
                break;
            default:
                setFieldsValue({
                    /** 会员*/
                    user: [{key: dataSource.userid, label: dataSource.MemeberCode}],
                    /** 快递方式*/
                    expressType: {key: dataSource.expressTypeID, label: dataSource.expressTypeName},
                    expressNo: dataSource.expressNo,
                    /** 件数*/
                    inPackageCount: dataSource.InPackageCount,
                    inWeight: dataSource.InWeight,
                    inLength: dataSource.InLength,
                    InVolume: dataSource.InVolume,
                    inWidth: dataSource.InWidth,
                    inHeight: dataSource.InHeight,
                    /** 交接单*/
                    transferNo: dataSource.TransferNo,
                    /** 备注*/
                    warehouseAdminRemark: dataSource.WarehouseAdminRemark,
                    /** 客服*/
                    customerService: [{key: dataSource.CustomerServiceID, label: dataSource.CustomerServiceName}],
                    /** 仓库*/
                    wareHouse: {key: dataSource.WareHouseID, label: dataSource.WareHouseName}
                });
                if (!(type === "modal")) {
                    setFieldsValue({
                        /** 入库状态*/
                        inWareHouseStatus: dataSource.currentStatus
                    });
                }
                break;
        }
    }

    componentDidMount() {
        const topThis = this;
        topThis.initData();
    }

    onFileUpload(files: any[]) {
        if (files && JSON.stringify(this.state.files) !== JSON.stringify(files))
            this.setState({files: files});
    }

    render() {
        const topThis = this;
        const {props: {ID, form: {getFieldDecorator}, type, style},state:{dataSource}} = topThis;

        /** 控件栅格*/
        const spanLayout: ColProps = {
            xs: 24,
            sm: 12,
            md: 8
        }


        /** 是否必填*/
        const required = (type === "view" || type === "modal" || type === "query") ? false : true;

        /** 是否只读*/
        const readonly = (type === "view" || type === "modal" || type === "query") ? true : false;

        const volumeStyle = Constants.minSM ? {marginBottom: '8px'} : {width: '100%'};

        /** vertical布局样式BUG --- 请勿移动控件顺序*/
        const formItemLayout = (type === "view" || type === "modal" || type === "query") && Constants.minSM ? {
            labelCol: {
                xs: {span: 7}
            },
            wrapperCol: {
                xs: {span: 17}
            }
        } : null;

        return (
            <Form className="warehouse-in-add-form" style={style}
                  layout={(type === "view" || type === "modal" || type === "query") ? "inline" : "vertical"}
                  onSubmit={topThis.onSubmit.bind(this)}>
                <Row gutter={16}>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"会员"}>
                            {getFieldDecorator("user", {
                                rules: [{required: required, message: '请选择会员!'}],
                            })(<FormControl.FormSelectIndex readonly={readonly} type={SelectType.Member}
                                                            placeholder="会员"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"仓库"}>
                            {getFieldDecorator("wareHouse", {
                                rules: [{required: required, message: '请选择仓库!'}],
                            })(<FormWarehouseSelect readonly={readonly} placeholder="仓库"></FormWarehouseSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"客服"}>
                            {getFieldDecorator("customerService", {
                                rules: [{required: required, message: '请选择客服!'}],
                            })(<FormControl.FormSelectIndex readonly={readonly} type={SelectType.CustomerService}
                                                            placeholder="客服"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"快递方式"}>
                            {getFieldDecorator("expressType", {
                                rules: [{required: required, message: '请选择快递方式!'}],
                            })(<FormExpressSelect readonly={readonly} placeholder="快递方式"></FormExpressSelect>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"快递单号"}>
                            {getFieldDecorator("expressNo", {
                                rules: [{required: required, message: '请选择快递单号!'}],
                            })(<FormInput readonly={readonly} placeholder="快递单号"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"交接单"}>
                            {getFieldDecorator("transferNo")(<FormInput readonly={readonly} placeholder="交接单"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={readonly ? "初始重量" : "初始重量(kg)"}>
                            {getFieldDecorator("inWeight", {
                                rules: [{required: required, message: '请填写重量!'}],
                            })(<FormInputNumber readonly={readonly} step={0.01} style={{width: '100%'}}
                                                suffixText="kg"
                                                placeholder="初始重量"/>)}
                        </FormItem>
                    </Col>
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"件数"}>
                            {getFieldDecorator("inPackageCount", {
                                rules: [{required: required, message: '请填写件数!'}],
                            })(<FormInputNumber readonly={readonly} style={{width: '100%'}}
                                                placeholder="件数"/>)}
                        </FormItem>
                    </Col>
                    {!(type === "modal" || type === "query") ? <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"入库状态"}>
                            {getFieldDecorator("inWareHouseStatus", {
                                rules: [{required: required, message: '请选择状态!'}],
                            })(<FormStatusSelect readonly={readonly}
                                                 type={ModelNameSpace.OrderTypeEnum.OrderIn}
                                                 placeholder="入库状态"></FormStatusSelect>)}
                        </FormItem>
                    </Col> : null}
                    {readonly&&dataSource ? <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"入库时间"}>
                            <span>{moment(dataSource.InWareHouseTime).format('YYYY-MM-DD HH:mm')}</span>
                        </FormItem>
                    </Col> : null}
                    <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={readonly ? "初始体积" : "初始体积(cm³)"}>
                            <Row gutter={16} type="flex">
                                <Col lg={!readonly ? 6 : 24}>
                                    {getFieldDecorator('InVolume', {
                                        rules: [{required: required, message: '请填写体积!'}],
                                    })(<FormInputNumber readonly={readonly} placeholder="体积"
                                                        suffixText="cm³"
                                                        style={volumeStyle} min={0}/>)}
                                </Col>
                                {!readonly ? <Col lg={6}>
                                    {getFieldDecorator('inLength', {
                                        rules: [{required: required, message: '请填写长度!'}],
                                    })(<FormInputNumber readonly={readonly} style={volumeStyle} min={0}
                                                        suffixText="cm"
                                                        placeholder="长（cm）"/>)}
                                </Col> : null}
                                {!readonly ? <Col lg={6}>
                                    {getFieldDecorator('inWidth', {
                                        rules: [{required: required, message: '请填写宽度!'}],
                                    })(<FormInputNumber readonly={readonly} style={volumeStyle} min={0}
                                                        suffixText="cm"
                                                        placeholder="宽（cm）"/>)}
                                </Col> : null}
                                {!readonly ? <Col lg={6}>
                                    {getFieldDecorator('inHeight', {
                                        rules: [{required: required, message: '请填写高度!'}],
                                    })(<FormInputNumber readonly={readonly} style={volumeStyle} min={0}
                                                        suffixText="cm"
                                                        placeholder="高（cm）"/>)}
                                </Col> : null}
                            </Row>
                        </FormItem>
                    </Col>
                    {readonly ? <Col {...spanLayout}>
                        <FormItem {...formItemLayout} label={"长宽高"}>
                            <Row type="flex">
                                <Col>
                                    {getFieldDecorator('inLength', {
                                        rules: [{required: required, message: '请填写长度!'}],
                                    })(<FormInputNumber readonly={readonly} style={volumeStyle} min={0}
                                                        suffixText="cm * "
                                                        placeholder="长（cm）"/>)}
                                </Col>
                                <Col>
                                    {getFieldDecorator('inWidth', {
                                        rules: [{required: required, message: '请填写宽度!'}],
                                    })(<FormInputNumber readonly={readonly} style={volumeStyle} min={0}
                                                        suffixText="cm * "
                                                        placeholder="宽（cm）"/>)}
                                </Col>
                                <Col>
                                    {getFieldDecorator('inHeight', {
                                        rules: [{required: required, message: '请填写高度!'}],
                                    })(<FormInputNumber readonly={readonly} style={volumeStyle} min={0}
                                                        suffixText="cm"
                                                        placeholder="高（cm）"/>)}
                                </Col>
                            </Row>
                        </FormItem>
                    </Col> : null}
                    <Col span={24}>
                        <FormItem {...formItemLayout} label={"备注"}>
                            {getFieldDecorator("warehouseAdminRemark")(<FormInputText readonly={readonly}
                                                                                      rows={4}></FormInputText>)}
                        </FormItem>
                    </Col>
                    <Col span={24}>
                        <FormItem {...formItemLayout} label={"附件"}>
                            <FormUpload disabled={readonly} imgCount={9}
                                        customerOrderID={ID ? ID : null}
                                        onChange={files => this.onFileUpload(files)}></FormUpload>
                        </FormItem>
                    </Col>
                </Row>
                {!readonly ? <Row>
                    <Col span={24}>
                        <Button type="primary" htmlType="submit">确定</Button>
                        <Button style={{marginLeft: 8}} onClick={() => {
                            /** 返回路由*/
                            hashHistory.goBack();
                        }}>取消</Button>
                    </Col>
                </Row> : <Row>
                    {!(type === "modal") ? <Col span={24}>
                        <Button type="primary" onClick={() => {
                            /** 返回路由*/
                            hashHistory.goBack();
                        }}>取消</Button>
                    </Col> : null}
                </Row>}
            </Form>
        );
    }
}

export default Form.create<any>()(WarehouseInForm);