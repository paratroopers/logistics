import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Button, Form} from 'antd';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';

interface CustomerServiceConfirmApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

interface CustomerServiceConfirmApprovePageStates {
    selectedKey?: string;
}

export interface QueryData {
    id?: string;
}


@withRouter
class CustomerServiceConfirmApprovePage extends React.Component<CustomerServiceConfirmApprovePageProps, CustomerServiceConfirmApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id
        }
    }

    onSubmit() {
        this.props.form.validateFields((err, values) => {
            console.log(1);
        })
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    form={this.props.form}
                                    Title="审批"
                                    Step={ModelNameSpace.OrderTypeEnum.OrderConfirm}>
            <FormTableDetailPage.Header>
                <Button key="1" type="primary" onClick={this.onSubmit.bind(this)}
                        style={{marginRight: "10px"}}>通过</Button>
                <Button key="2" type="primary" style={{marginRight: "10px"}}>拒绝</Button>
                <Button key="3" type="primary">取消</Button>
            </FormTableDetailPage.Header>
        </FormTableDetailPage>
    }
}

export default Form.create<any>()(CustomerServiceConfirmApprovePage);