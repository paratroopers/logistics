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

@withRouter
export class WarehouseOutPage extends React.Component<any, any> {
    constructor(props, context) {
        super(props, context);
    }

    getDropDownConfig() {
        const options: FormTableOperationModel[] = [{
            key: FormTableOperationEnum.View,
            type: "search",
            label: "查看",
            path: PathConfig.WarehouseOutViewPage
        }, {
            key: FormTableOperationEnum.Edit,
            type: "edit",
            label: "编辑",
            path: PathConfig.WarehouseOutApprovePage
        },]
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
        return <FormTablePage currentStep={ModelNameSpace.OrderTypeEnum.OrderOut}
                              searchConfig={this.getSearchConfig()}
                              title = "订单出库"
                              dropDownConfig={this.getDropDownConfig()}
                              callBackTitle="订单出库"
                              headerTip={'总计有{name}项订单待出库'}></FormTablePage>;
    }
}
