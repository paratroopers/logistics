import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage} from '../components-v1/form-table-page';
import {
    FormTableOperationModel,
    FormTableOperationEnum
} from "../components-v1/form-table-operation";

/// 待审核列表
interface MemberDeliveredPageProps {

}

interface MemberMyOrderWaitForApprovePageStates {

}

@withRouter
export class MemberDeliveredPage extends React.Component<MemberDeliveredPageProps, MemberMyOrderWaitForApprovePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: FormTableOperationModel[] = [
            {
                key: FormTableOperationEnum.View,
                type: "search",
                label: "查看"
            }
        ]
        return options;
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderOut}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="已发货"
                              title = "已发货"
                              headerTip={'总计有{name}项已发货订单'}></FormTablePage>;
    }
}