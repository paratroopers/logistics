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
import FormButtonCancel from "../components-v1/form-button-cancel";
import {PathConfig} from "../config/pathconfig";

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

    async onSubmit() {
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            let request: RequestNameSpace.CustomerOrderMergeUpdateRequest = {};
            for (let key of Object.keys(values.needUpdateData)) {
                request[key] = values[key] ? values[key] : values.needUpdateData[key];
            }
            request.ID = this.state.selectedKey;
            request.currentStep = Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.OrderMerge);
            request.currentStatus = ModelNameSpace.OrderStatusEnum.StatusB;
            const result = await APINameSpace.CustomerOrderAPI.CustomerOrderMergeUpdate(request);
            result.Status === 0 && message.success('操作成功');
        })
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    form={this.props.form}
                                    Title="审核"
                                    Step={ModelNameSpace.OrderTypeEnum.OrderMerge}>
            <FormTableDetailPage.Header>
                <Row type="flex" justify="end" gutter={16}>
                    <Col>
                        <Button onClick={this.onSubmit.bind(this)} key="1" type="primary">通过</Button>
                    </Col>
                    <Col>
                        <FormButtonCancel url={PathConfig.WarehousePackagePage}></FormButtonCancel>
                    </Col>
                </Row>
            </FormTableDetailPage.Header>
        </FormTableDetailPage>
    }
}

export default Form.create<any>()(WarehousePackageApprovePage);