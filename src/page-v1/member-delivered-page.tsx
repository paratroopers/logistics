import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage, DropDownModel} from '../components-v1/form-table-page';

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
        const options: DropDownModel = {
            items: [{
                key: PathConfig.MemberAddressPageView,
                type: "search",
                label: "审核"
            }, {
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
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderOut}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="已发货"
                              headerTip={'总计有{name}项已发货订单'}></FormTablePage>;
    }
}