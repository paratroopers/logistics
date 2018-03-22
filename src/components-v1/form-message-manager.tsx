import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Form, Input, Button, message} from 'antd';
import {FormComponentProps, WrappedFormUtils} from 'antd/lib/form/Form';
import {FormRichEdit}from "../components-v1/form-richedit";
const FormItem = Form.Item;


interface FormMessageManagerProps {
    form?: WrappedFormUtils;
}

class FormMessageManager extends React.Component<FormMessageManagerProps, any> {
    constructor(props) {
        super(props);
    }

    onSubmit() {
        const topThis = this;
        const {props: {form}} = topThis;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                message.success("发布成功");
            }
        })
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
                {getFieldDecorator("content", {
                    rules: [{required: true, message: '请填写内容'}],
                })(<FormRichEdit />)}
            </FormItem>
            <FormItem>
                <Button type="primary" onClick={topThis.onSubmit.bind(this)}>发布</Button>
            </FormItem>
        </Form>
    }
}

export default Form.create<any>()(FormMessageManager);