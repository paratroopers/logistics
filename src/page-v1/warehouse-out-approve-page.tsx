import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {Button, Form, Row, Col, message} from 'antd';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {Constants} from '../util/common';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {RequestNameSpace} from '../model/request';

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

    async onSubmit() {
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            let request: RequestNameSpace.CustomerOrderMergeUpdateRequest = {};
            let sets = new Set(Object.keys(values.needUpdateData).concat(Object.keys(values)));
            const keys = Array.from(sets as any);
            keys.forEach((item: string) => {
                request[item] = values[item] ? values[item] : values.needUpdateData[item];
            });
            request.ID = this.state.selectedKey;
            request.currentStep = Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.OrderOut);
            request.currentStatus = ModelNameSpace.OrderStatusEnum.StatusB;
            const result = await APINameSpace.CustomerOrderAPI.CustomerOrderMergeUpdate(request);
            result.Status === 0 && message.success('操作成功');
        })
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    Title="审批"
                                    form={this.props.form}
                                    Step={ModelNameSpace.OrderTypeEnum.OrderOut}>
            <FormTableDetailPage.Header>
                <Row type="flex" justify="end" gutter={16}>
                    <Col>
                        <Button key="1" type="primary" onClick={this.onSubmit.bind(this)}>通过</Button>
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