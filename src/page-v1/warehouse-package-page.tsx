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
            type: "edit",
            label: "审核",
            path: PathConfig.WarehousePackageApprovePage
        }, {
            key: FormTableOperationEnum.View,
            type: "search",
            label: "查看",
            path: PathConfig.WarehousePackageViewPage
        }]
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
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderMerge}
                              searchConfig={this.getSearchConfig()}
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="合并打包"
                              headerTip={'总计有{name}项合并订单'}></FormTablePage>;
    }
}