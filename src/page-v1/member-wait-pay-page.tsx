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
interface MemberWaitPayPageProps {

}

interface MemberWaitPayPageStates {
}

@withRouter
export class MemberWaitPayPage extends React.Component<MemberWaitPayPageProps, MemberWaitPayPageStates> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: FormTableOperationModel[] = [
            {
                key: FormTableOperationEnum.View,
                type: "search",
                label: "查看"
            },
            {
                key: FormTableOperationEnum.Edit,
                type: "edit",
                label: "编辑"
            },
            {
                key: FormTableOperationEnum.Detele,
                type: "delete",
                label: "删除"
            }
        ]
        return options;
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.WaitPay}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="代付款"
                              headerTip={'总计有{name}项待支付订单'}></FormTablePage>;
    }
}