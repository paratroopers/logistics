/**
 * 自定义高级搜索
 * Created by Handy
 * */
import * as React from 'react';
import { Form, Row, Col, Button, Icon } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {isArray} from "util";
const FormItem = Form.Item;

interface FormAdvancedSearchProps extends FormComponentProps {
    /** 控件列表*/
    formAdvancedItems?: FormAdvancedItemModel[];
    /** 点击搜索*/
    onClickSearch?: (values:any) => void;
    /*控件选择值*/
    selectValues?:()=> any;
}

interface FormAdvancedSearchStates {
    /** 是否展示高级搜索的控件*/
    expand:boolean;
    selectValues?:any;
}

export class FormAdvancedItemModel {
    /** 是否默认显示*/
    defaultDisplay?: boolean;
    /** 显示名称*/
    displayName?:string;
    /** 字段名称*/
    fieldName: string;
    /** 控件*/
    control: React.ReactNode;
}


 class FormAdvancedSearch extends React.Component<FormAdvancedSearchProps, FormAdvancedSearchStates> {
    constructor(props) {
        super(props);
        this.state = {
            expand: false
        };
    }

    SelectAllVaules(){
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                return values;
            }
        });
    }

    /** 点击搜索*/
    onSearch = (e) => {
        e.preventDefault();
        const topThis = this;
        const {props: {onClickSearch}} = topThis;
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                if (onClickSearch)
                    onClickSearch(values);
            }
        });
    }

    /** 点击重置*/
    onReset = (e) => {
        e.preventDefault();
        const topThis=this;
        const {props: {onClickSearch}} = topThis;
        this.props.form.resetFields();
        if (onClickSearch)
            onClickSearch(null);
    }

    /** 高级搜索点击事件*/
    toggle = () => {
        const topThis = this;
        const {state: {expand}} = topThis;
        this.setState({expand: !expand});
    }

    // 创建高级搜索的Items
    renderFormAdvancedItems() {
        const topThis = this;
        const {props: {formAdvancedItems, form: {getFieldDecorator}}, state: {expand}} = topThis;
        const children = [];

        if (isArray(formAdvancedItems)) {
            formAdvancedItems.map(function (item, index) {
                const spanLayout = {
                    xs: 24,
                    sm: 12,
                    md: 12,
                    lg: 8,
                    xl: 8
                }

                const display = expand ? 'block' : item.defaultDisplay ? 'block' : 'none';
                children.push(<Col {...spanLayout} key={index} style={{display: display}}>
                    <FormItem label={item.displayName}>
                        {getFieldDecorator(item.fieldName)(item.control)}
                    </FormItem>
                </Col>)
            })
        }
        return children;
    }

    render() {
        const topThis = this;
        const {state: {expand}} = topThis;
        return <Form className="na-advanced-search-form"
                     layout={"vertical"}
                     onSubmit={topThis.onSearch.bind(this)}>
            <Row gutter={16}>{topThis.renderFormAdvancedItems()}</Row>
            <Row>
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button style={{marginLeft: 8}} onClick={topThis.onReset.bind(this)}>重置</Button>
                    <a style={{marginLeft: 8, fontSize: 12}} onClick={topThis.toggle.bind(this)}>
                        高级搜索 <Icon type={expand ? 'up' : 'down'}/>
                    </a>
                </Col>
            </Row>
        </Form>;
    }
}

export default Form.create<any>()(FormAdvancedSearch);