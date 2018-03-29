import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Form, Input, Button, message} from 'antd';
import {FormComponentProps, WrappedFormUtils} from 'antd/lib/form/Form';
import FormMessageManager from "../components-v1/form-message-manager";
import {ContactCustomerService} from "../components-v1/customer-service-dropdown";

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
            <ContactCustomerService></ContactCustomerService>
        </Row>
    }
}