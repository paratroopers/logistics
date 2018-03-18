import * as React from 'react';
import {InputNumber, Row, Col, Form} from 'antd';
import {FormComponentProps} from 'antd/lib/form';
import {RowProps} from 'antd/lib/row';
import {FormSettingGroup} from './form-setting-group';
import {ModelNameSpace} from '../model/model';

export interface FormOrderWarehousePackageProps extends FormComponentProps {
    readOnly?: boolean;
    data?: ModelNameSpace.WarehousePackageModel;
    title?: string;
}

export interface FormOrderWarehousePackageStates {
    data?: ModelNameSpace.WarehousePackageModel;
    visible?: boolean;
}

class FormOrderWarehousePackage extends React.Component<FormOrderWarehousePackageProps, FormOrderWarehousePackageStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            data: props.data ? props.data : {},
            visible: false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps && nextProps.data !== this.props.data) {
            this.setState({data: nextProps.data});
        }
    }

    getNumberFixed(num: number) {
        return num ? num.toFixed(2) : '0.00';
    }

    renderRow(label?: string, isTextArea?: boolean, noRequired?: boolean, fieldName?: string, defaultValue?: any, layout?: any) {
        const {form, readOnly} = this.props;
        const spanLayout = layout ? layout : {
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 6
        }

        if (readOnly)
            return <Col {...spanLayout}>
                <Form.Item label={label}>
                    {
                        <label>{defaultValue}</label>
                    }
                </Form.Item>
            </Col>;
        else
            return <Col {...spanLayout}>
                <Form.Item label={label} required={readOnly ? false : !noRequired}>
                    {
                        form.getFieldDecorator(fieldName, {
                            initialValue: defaultValue,
                            rules: [{
                                required: !noRequired,
                                message: ' '
                            }]
                        })(<InputNumber disabled={this.props.readOnly} style={{width: '100%'}}
                                        placeholder={readOnly ? "" : '请输入'}></InputNumber>)
                    }
                </Form.Item>
            </Col>
    }

    render() {
        const {state: {data: {packageLength, packageWidth, packageHeight, packageWeight}}, props: {readOnly, title}} = this;
        const defaultRowSetting: RowProps = {type: "flex", gutter: 16};
        return <FormSettingGroup title={title}>
            <Form className="form-order-address" layout={readOnly ? "inline" : "vertical"}>
                <Row {...defaultRowSetting}>
                    {this.renderRow('打包长度(cm)', false, false, 'packageLength', this.getNumberFixed(packageLength))}
                    {this.renderRow('打包宽度(cm)', false, false, 'packageWidth', this.getNumberFixed(packageWidth))}
                    {this.renderRow('打包高度(cm)', false, false, 'packageHeight', this.getNumberFixed(packageHeight))}
                    {this.renderRow('打包总重量(cm³)', false, false, 'packageWeight', this.getNumberFixed(packageWeight))}
                </Row>
            </Form>
        </FormSettingGroup>
    }
}

export default Form.create<any>()(FormOrderWarehousePackage);