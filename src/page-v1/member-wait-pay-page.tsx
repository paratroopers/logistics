import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage, DropDownModel} from '../components-v1/form-table-page';

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
        const options: DropDownModel = {
            items: [{
                key: PathConfig.MemberAddressPageView,
                type: "search",
                label: "审核"
            },
                {
                    key: PathConfig.MemberAddressPageEdit,
                    type: "edit",
                    label: "查看"
                }
            ],
            editPath: PathConfig.MemberWaitPayApprovePage
        };
        return options;
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.WaitPay}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="代付款"
                              headerTip={'总计有{name}项待支付订单'}></FormTablePage>;
    }
}