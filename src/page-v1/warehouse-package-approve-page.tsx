import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Button} from 'antd';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';

interface WarehousePackageApprovePageProps extends RouteComponentProps<any, any>, FormComponentProps {

}

interface WarehousePackageApprovePageStates {
    selectedKey?: string;
}

export interface QueryData {
    id?: string;
}

@withRouter
export class WarehousePackageApprovePage extends React.Component<WarehousePackageApprovePageProps, WarehousePackageApprovePageStates> {
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: (this.props.location.query as QueryData).id
        }
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    Title="审核"
                                    Step={ModelNameSpace.OrderTypeEnum.OrderMerge}>
            <FormTableDetailPage.Header>
                <Button key="1" type="primary" style={{marginRight: "10px"}}>通过</Button>
                <Button key="2" type="primary">取消</Button>
            </FormTableDetailPage.Header>
        </FormTableDetailPage>
    }
}