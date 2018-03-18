import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Button, Form} from 'antd';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';

interface WarehouseOutApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {

}

interface WarehouseOutApprovePageStates {
    selectedKey?: string;
}

export interface QueryData {
    id?: string;
}

@withRouter
class WarehouseOutApprovePage extends React.Component<WarehouseOutApprovePageProps, WarehouseOutApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id
        }
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    Title="审批"
                                    form={this.props.form}
                                    Step={ModelNameSpace.OrderTypeEnum.OrderOut}>
            <FormTableDetailPage.Header>
                <Button key="1" type="primary" style={{marginRight: "10px"}}>通过</Button>
                <Button key="2" type="primary">取消</Button>
            </FormTableDetailPage.Header>
        </FormTableDetailPage>
    }
}

export default Form.create<any>()(WarehouseOutApprovePage);