import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {SelectType} from "../util/common";
import {FormControl} from "../components-v1/form-control";
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
                type: "edit",
                label: "查看",
                path: PathConfig.MemberWaitPayViewPage
            },
            {
                key: FormTableOperationEnum.Edit,
                type: "search",
                label: "付款",
                path: PathConfig.MemberWaitPayApprovePage
            }
        ]
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
                fieldName: "customerChooseChannelID",
                displayName: "渠道",
                control: <FormControl.FormSelect type={SelectType.channel} placeholder="渠道"/>
            }];
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.WaitPay}
                              searchConfig={this.getSearchConfig()}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="代付款"
                              headerTip={'总计有{name}项待支付订单'}></FormTablePage>;
    }
}