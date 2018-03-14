import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {SelectType} from "../util/common";
import {FormControl} from "../components-v1/form-control";
import {FormStatusSelect} from "../components-v1/form-status-select";
import {FormTablePage} from '../components-v1/form-table-page';
import {
    FormTableOperationModel,
    FormTableOperationEnum
} from "../components-v1/form-table-operation";

interface CustomerServiceConfirmPageProps {
}

interface CustomerServiceConfirmPageStates {

}

@withRouter
export class CustomerServiceConfirmPage extends React.Component<CustomerServiceConfirmPageProps, CustomerServiceConfirmPageStates> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: FormTableOperationModel[] = [{
            key: FormTableOperationEnum.Edit,
            type: "edit",
            label: "审核",
            path: PathConfig.CustomerServiceConfirmApprovePage
        }, {
            key: FormTableOperationEnum.View,
            type: "search",
            label: "查看",
            path: PathConfig.CustomerServiceConfirmViewPage
        }];
        return options;
    }

    getSearchConfig() {
        return [
            {
                defaultDisplay: true,
                fieldName: "expressNo",
                displayName: "快递单号",
                mobileShow: true,
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} isadmin={false} placeholder="快递单号"/>
            },
            {
                defaultDisplay: true,
                fieldName: "channel",
                displayName: "渠道",
                control: <FormControl.FormSelect type={SelectType.channel} placeholder="渠道"/>
            },
            {
                defaultDisplay: true,
                fieldName: "currentStatus",
                displayName: "状态",
                control: <FormStatusSelect type={ModelNameSpace.OrderTypeEnum.WaitApprove}
                                           placeholder="搜索订单状态"></FormStatusSelect>
            }];
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderConfirm}
                              searchConfig={this.getSearchConfig()}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="订单确认"
                              headerTip={'总计有{name}项待审批'}></FormTablePage>;
    }
}