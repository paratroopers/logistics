import * as React from 'react';
import {withRouter} from 'react-router';
import {ModelNameSpace} from "../model/model";
import {PathConfig} from '../config/pathconfig';
import {FormTablePage, DropDownModel} from '../components-v1/form-table-page';

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
        const options: DropDownModel = {
            items: [{
                key: 'approve',
                type: "search",
                label: "审核"
            }, {
                key: 'view',
                type: "edit",
                label: "查看"
            }
            ],
            viewPath: PathConfig.WarehousePackageViewPage,
            editPath: PathConfig.WarehousePackageApprovePage
        };
        return options;
    }

    render() {
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderMerge}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="合并打包"
                              headerTip={'总计有{name}项合并订单'}></FormTablePage>;
    }
}