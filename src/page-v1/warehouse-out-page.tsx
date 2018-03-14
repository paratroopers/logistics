import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage} from '../components-v1/form-table-page';
import {
    FormTableOperationModel,
    FormTableOperationEnum
} from "../components-v1/form-table-operation";

@withRouter
export class WarehouseOutPage extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: FormTableOperationModel[] = [{
            key: FormTableOperationEnum.Edit,
            type: "search",
            label: "审核",
            path: PathConfig.WarehouseOutApprovePage
        }, {
            key: FormTableOperationEnum.View,
            type: "edit",
            label: "查看",
            path: PathConfig.WarehousePackageViewPage
        }]
        return options;
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderOut}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="订单出库"
                              headerTip={'总计有{name}项出库订单'}></FormTablePage>;
    }
}
