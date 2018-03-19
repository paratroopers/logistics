import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Button, Form,Row,Col} from 'antd';
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

export default Form.create<any>()(WarehouseOutApprovePage);