import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Col,Form} from 'antd';
import {extendConfigurationFile} from "tslint/lib/configuration";
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
            <FormMessageManager></FormMessageManager>
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