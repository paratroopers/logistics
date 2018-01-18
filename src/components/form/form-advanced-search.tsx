import * as React from 'react';
import { Form, Row, Col, Input, Button, Icon } from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
const FormItem = Form.Item;

interface FormAdvancedSearchProps extends FormComponentProps {
    onClickSearch?: () => void;
}

interface FormAdvancedSearchStates {
    expand:boolean;
}

class FormAdvancedSearch extends React.Component<FormAdvancedSearchProps, FormAdvancedSearchStates> {
    constructor(props) {
        super(props);
        this.state = {
            expand: false,
        };
    }

    handleSearch = (e) => {
        e.preventDefault();
        const topThis = this;
        const {props: {onClickSearch}} = topThis;
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
            if (!err) {
                if (onClickSearch)
                    onClickSearch();
            }
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    /** 高级搜索点击事件*/
    toggle = () => {
        const topThis = this;
        const {state: {expand}} = topThis;
        this.setState({expand: !expand});
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 6 : 3;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 6; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`)(
                            <Input placeholder="" />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }

    render() {
        const topThis = this;
        const {state:{expand}} = topThis;
        return <Form className="na-advanced-search-form"
                     onSubmit={topThis.handleSearch.bind(this)}>
            <Row gutter={24}>{topThis.getFields()}</Row>
            <Row>
                <Col span={24} style={{textAlign: 'right'}}>
                    <Button type="primary" htmlType="submit">搜索</Button>
                    <Button style={{marginLeft: 8}} onClick={topThis.handleReset.bind(this)}>重置</Button>
                    <a style={{marginLeft: 8, fontSize: 12}} onClick={topThis.toggle.bind(this)}>
                        高级搜索 <Icon type={expand ? 'up' : 'down'}/>
                    </a>
                </Col>
            </Row>
        </Form>;
    }
}

export default Form.create<any>()(FormAdvancedSearch);