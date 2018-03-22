import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Col,Form} from 'antd';
import {FormRichEdit}from "../components-v1/form-richedit";
const FormItem=Form.Item;

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Row className="demo-page">
            <FormRichEdit></FormRichEdit>
        </Row>
    }
}

class FormMessageManager extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    render() {
        return <Form>

        </Form>
    }
}
export default Form.create<any>()(FormMessageManager);