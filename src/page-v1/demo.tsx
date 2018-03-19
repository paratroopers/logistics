import * as React from 'react';
import {withRouter} from 'react-router';
import {Form} from 'antd';
import {FormComponentProps} from 'antd/lib/form/Form';
import {
    FormOrderDeclare
} from "../components-v1/all-components-export";

interface DemoStates {
    readOnly: boolean;
}

interface DemoProps extends FormComponentProps {

}

@withRouter
class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
        this.state = {
            readOnly: false
        }
    }

    render() {
        const {state: {readOnly}, props: {form}} = this;
        return <div className="demo-page">
            <div>
                <button onClick={() => {
                    this.setState({readOnly: !readOnly});
                }}>切换状态</button>
            </div>
            <FormOrderDeclare readOnly={readOnly} form={form}></FormOrderDeclare>
        </div>
    }
}

export default Form.create<any>()(DemoPage);