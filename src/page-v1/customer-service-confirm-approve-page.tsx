import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Layout} from 'antd';
import {
    ContentHeaderControl,
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';
import {} from '../components-v1/all-components-export';

interface CustomerServiceConfirmApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

interface CustomerServiceConfirmApprovePageStates {
    selectedKey?: string;
}

export interface QueryData {
    id?: string;
}


@withRouter
export class CustomerServiceConfirmApprovePage extends React.Component<CustomerServiceConfirmApprovePageProps, CustomerServiceConfirmApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id
        }
    }

    render() {
        return <Layout className="customer-service-confirm-approve-page view-content-page">
            <Layout.Header className="customer-service-confirm-approve-page-header view-content-page-header">
                <ContentHeaderControl title="审批"></ContentHeaderControl>
            </Layout.Header>
            <FormTableDetailPage ID={this.state.selectedKey}
                                 Step={ModelNameSpace.OrderTypeEnum.OrderConfirm}></FormTableDetailPage>
        </Layout>
    }
}