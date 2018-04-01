import * as React from 'react';
import {withRouter, RouteComponentProps, hashHistory} from 'react-router';
import {Button, Form, Row, Col, message, Modal} from 'antd';
import {
    FormTableDetailPage, FormButtonCancel
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {Constants} from '../util/common';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {RequestNameSpace} from '../model/request';
import {PathConfig} from "../config/pathconfig";

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

    async onReject() {
        Modal.confirm({
            title: '提示',
            content: '确定拒绝这个订单吗?',
            onOk: async () => {
                const request: any = {
                    CustomerOrderMergeID: this.state.selectedKey
                };
                const response = await APINameSpace.CustomerOrderAPI.CustomerOrderReject(request);
                if (response.Status === 0) {
                    hashHistory.push({
                        pathname: PathConfig.CustomerServiceConfirmPage
                    })
                    message.success('删除成功');
                }
            }
        });
    }

    async onSubmit() {
        this.props.form.validateFields(async (err, values) => {
            if (err) return;
            if (!values.CustomerChooseChannelID) {
                message.warning('请至少选择一条渠道');
                return;
            }
            let request: RequestNameSpace.CustomerOrderMergeUpdateRequest = {};
            for (let key of Object.keys(values.needUpdateData)) {
                request[key] = values[key] ? values[key] : values.needUpdateData[key];
            }
            request.ID = this.state.selectedKey;
            request.currentStep = Constants.getOrderStep(ModelNameSpace.OrderTypeEnum.OrderConfirm);
            request.currentStatus = ModelNameSpace.OrderStatusEnum.StatusB;
            const result = await APINameSpace.CustomerOrderAPI.CustomerOrderMergeUpdate(request);
            if (result.Status === 0) {
                hashHistory.push({
                    pathname: PathConfig.CustomerServiceConfirmPage
                })
                message.success('操作成功');
            }
        })
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    form={this.props.form}
                                    Title="审批"
                                    Step={ModelNameSpace.OrderTypeEnum.OrderConfirm}>
            <FormTableDetailPage.Header>
                <Row type="flex" justify="end" gutter={16}>
                    <Col>
                        <Button key="1" type="primary" onClick={this.onSubmit.bind(this)}>通过</Button>
                    </Col>
                    <Col>
                        <Button key="2" type="primary" onClick={this.onReject.bind(this)}>拒绝</Button>
                    </Col>
                    <Col>
                        <FormButtonCancel url={PathConfig.CustomerServiceConfirmPage}></FormButtonCancel>
                    </Col>
                </Row>
            </FormTableDetailPage.Header>
        </FormTableDetailPage>
    }
}

export default Form.create<any>()(CustomerServiceConfirmApprovePage);