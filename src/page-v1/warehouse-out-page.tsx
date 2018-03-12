import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage, DropDownModel} from '../components-v1/form-table-page';

@withRouter
export class WarehouseOutPage extends React.Component<any, any> {
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
                              callBackTitle="订单出库"
                              headerTip={'总计有{name}项出库订单'}></FormTablePage>;
    }
}
