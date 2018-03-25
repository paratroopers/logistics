import * as React from 'react';
import {Form, Input, Button} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {FormLzEdit}from "../components-v1/form-lz-edit";
import {ModelNameSpace} from "../model/model";
const FormItem = Form.Item;


interface FormMessageManagerProps extends FormComponentProps {
    /** 点击提交*/
    onSubmit?: (values: any, status: number) => void;
    /** 数据*/
    item?: ModelNameSpace.MessageModel;
}

export interface FormMessageManagerStates {

}

class FormMessageManager extends React.Component<FormMessageManagerProps, FormMessageManagerStates> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const topThis = this;
        const {props: {item, form}} = topThis;
        form.setFieldsValue({"title": item.title, "message": item.message});
    }

    /** 点击确认*/
    onSubmit = (status: number) => {
        const topThis = this;
        const {props: {onSubmit, form}} = topThis;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (onSubmit)
                    onSubmit(values, status);
            }
        });
    }

    render() {
        const topThis = this;
        const {props: {form: {getFieldDecorator}}} = topThis;
        return <Form>
            <FormItem label={"标题"}>
                {getFieldDecorator("title", {
                    rules: [{required: true, message: '请填写标题'}],
                })(<Input placeholder=""/>)}
            </FormItem>
            <FormItem label={"内容"}>
                {getFieldDecorator("message", {
                    rules: [{required: true, message: '请填写内容'}],
                })(<FormLzEdit />)}
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={topThis.onSubmit.bind(this, 0)}>保存</Button>
                <Button type="primary" onClick={topThis.onSubmit.bind(this, 1)}>发布</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create<any>()(FormMessageManager);