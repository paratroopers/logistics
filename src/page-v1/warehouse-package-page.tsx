import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage} from '../components-v1/form-table-page';
import {
    FormTableOperationModel,
    FormTableOperationEnum
} from "../components-v1/form-table-operation";

interface WarehousePackgePageProps {

}

interface WarehousePackgePageStates {
}


@withRouter
export default class WarehousePackgePage extends React.Component<WarehousePackgePageProps, WarehousePackgePageStates> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: FormTableOperationModel[] = [{
            key: FormTableOperationEnum.Edit,
            type: "search",
            label: "审核",
            path: PathConfig.WarehousePackageApprovePage
        }, {
            key: FormTableOperationEnum.View,
            type: "edit",
            label: "查看",
            path: PathConfig.WarehousePackageViewPage
        }]
        return options;
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderMerge}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="合并打包"
                              headerTip={'总计有{name}项合并订单'}></FormTablePage>;
    }
}