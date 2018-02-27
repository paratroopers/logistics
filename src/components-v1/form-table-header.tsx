import * as React from 'react';
import {Row, Col, Icon,Form} from "antd";
import {isArray} from "util";
import {FormComponentProps} from 'antd/lib/form/Form';
const FormItem = Form.Item;

export interface FormTableHeaderProps extends FormComponentProps {
    title?: React.ReactNode;
    buttonGroup?: FormTableHeaderButton[];
    searchControl?: {
        onClickSearch?: (values: any) => void,
        items: SearchFormModel[]
    }
}

export interface FormTableHeaderStates {}

export class FormTableHeaderButton {
    displayName?: string;
    icon?: React.ReactNode;
    onClick?: () => void;
    count?: number;
    isShowCount?:boolean;
}

export class SearchFormModel {
    /** 显示名称*/
    displayName?: string;
    /** 字段名称*/
    fieldName: string;
    /** 控件*/
    control: React.ReactNode;
    /** 布局*/
    layout?: any;
}

class FormTableHeader extends React.Component<FormTableHeaderProps, FormTableHeaderStates> {
    constructor(props, context) {
        super(props, context);
    }

    renderSearchForm() {
        const topThis = this;
        const {props: {searchControl, form: {getFieldDecorator}}} = topThis;
        const children = [];
        if (searchControl && isArray(searchControl.items)) {
            searchControl.items.map(function (item) {
                children.push(<FormItem>
                    {getFieldDecorator(item.fieldName)(item.control)}
                </FormItem>)
            })
        }
        return children;
    }

    renderButtonGroup() {
        const topThis = this;
        const {props: {buttonGroup}} = topThis;
        const buttons = isArray(buttonGroup) ? buttonGroup.map((item, index) => {
            return <a onClick={item.onClick} key={index}>
                {typeof  item.icon === "string" ? <Icon type={item.icon}></Icon> : item.icon}
                <span>{item.displayName + (item.isShowCount ? `(${item.count})` : null)}</span>
            </a>
        }) : null;
        return <Row>{buttons}</Row>
    }

    render() {
        const topThis = this;
        const {props: {title}} = topThis;
        return <Row className="form-table-header" type="flex" justify="space-between">
            <Row style={{display: "inline-flex"}}>
                <Col className="order-title">
                    {topThis.renderButtonGroup()}
                </Col>
                <Col className="order-title">
                    {title ? <span className="order-count">
                    <Icon type="info-circle" style={{color: '#0193e4', marginRight: 8}}></Icon>
                </span> : null}
                    {title}
                </Col>
            </Row>
            <Row>
                <Form>{topThis.renderSearchForm()}</Form>
            </Row>
        </Row>
    }
}

export default Form.create<any>()(FormTableHeader);