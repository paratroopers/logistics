import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Button, Form,Row,Col} from 'antd';
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
                                    form={this.props.form}
                                    Title="审核"
                                    Step={ModelNameSpace.OrderTypeEnum.OrderMerge}>
            <FormTableDetailPage.Header>
                <Row type="flex" justify="end" gutter={16}>
                    <Col>
                        <Button key="1" type="primary">通过</Button>
                    </Col>
                    <Col>
                        <Button key="2" type="primary">拒绝</Button>
                    </Col>
                    <Col>
                        <Button key="3" type="primary">取消</Button>
                    </Col>
                </Row>
            </FormTableDetailPage.Header>
        </FormTableDetailPage>
    }
}

export default Form.create<any>()(WarehousePackageApprovePage);