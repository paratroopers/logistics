import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Form} from 'antd';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';

interface MemberWaitPayApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {
}

interface MemberWaitPayApprovePageStates {
    viewData?: ModelNameSpace.CustomerOrderModel;
    /** 原始订单ID*/
    selectedKey?: string;
    /** 源数据*/
    data?: ModelNameSpace.CustomerOrderMergeDetailModel;
}

export interface QueryData {
    id?: string;
}

@withRouter
export class MemberWaitPayApprovePage extends React.Component<MemberWaitPayApprovePageProps, MemberWaitPayApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id
        }
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    form={this.props.form}
                                    Title="待付款"
                                    Step={ModelNameSpace.OrderTypeEnum.WaitPay}>
            {/**/}
        </FormTableDetailPage>
    }
}

export default Form.create<any>()(MemberWaitPayApprovePage);