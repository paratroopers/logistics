import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Input,DatePicker} from "antd";
const { RangePicker } = DatePicker;
import {FormAdvancedSearch,FormStatusSelect,FormExpressSelect,FormWarehouseSelect} from "../../components/form/index";
import {FormAdvancedItemModel} from "../../components/form/form-advanced-search";
import {FormControl} from './enzodemo';
import  {SelectType} from '../../util/common';

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    renderFormAdvancedItems() {
        const items: FormAdvancedItemModel[] = [
            {
                defaultDisplay: true,
                fieldName: "A",
                displayName:"状态",
                control: <FormStatusSelect></FormStatusSelect>
            },
            {
                defaultDisplay: true,
                fieldName: "B",
                displayName:"物流方式",
                control: <FormExpressSelect></FormExpressSelect>
            }, {
                defaultDisplay: true,
                fieldName: "C",
                displayName:"仓库",
                control: <FormWarehouseSelect></FormWarehouseSelect>
            }, {
                defaultDisplay: false,
                fieldName: "D",
                displayName:"时间范围",
                control: <RangePicker></RangePicker>
            },{
                defaultDisplay: false,
                fieldName: "H",
                displayName:"会员",
                control: <FormControl.FormSelectIndex type={SelectType.Member} placeholder="搜索会员"/>
            },{
                defaultDisplay: false,
                fieldName: "I",
                displayName:"客服",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerService} placeholder="搜索客服"/>
            },
            {
                defaultDisplay: false,
                fieldName: "I",
                displayName:"仓库管理员",
                control: <FormControl.FormSelectIndex type={SelectType.WarehouseAdmin} placeholder="搜索仓库管理员"/>
            },
            {
                defaultDisplay: false,
                fieldName: "J",
                displayName:"客服订单号",
                control: <FormControl.FormSelectIndex type={SelectType.CustomerOrder} placeholder="搜索客服订单号"/>
            },
            {
                defaultDisplay: false,
                fieldName: "K",
                displayName:"快递单号",
                control: <FormControl.FormSelectIndex type={SelectType.ExpressNo} placeholder="搜索快递单号"/>
            }
        ];
        return items;
    }

    render() {
        const topThis = this;
        return <Row className="demo-page">
            <FormAdvancedSearch formAdvancedItems={topThis.renderFormAdvancedItems()} onClickSearch={(values) => {
                console.log(values);
            }}></FormAdvancedSearch>
        </Row>
    }
}