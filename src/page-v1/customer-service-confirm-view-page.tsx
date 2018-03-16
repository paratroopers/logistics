import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';

interface CustomerServiceConfirmViewPageProps extends RouteComponentProps<any, any>, FormComponentProps {

}

interface CustomerServiceConfirmViewPageStates {
    selectedKey?: string;
}

export interface QueryData {
    id?: string;
}

@withRouter
export class CustomerServiceConfirmViewPage extends React.Component<CustomerServiceConfirmViewPageProps, CustomerServiceConfirmViewPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id
        }
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    Title="查看"
                                    Step={ModelNameSpace.OrderTypeEnum.OrderConfirm}
                                    readyOnly></FormTableDetailPage>
    }
}