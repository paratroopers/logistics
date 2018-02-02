import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,DatePicker} from "antd";
const { RangePicker } = DatePicker;
// import {FormAdvancedSearch,FormStatusSelect,FormExpressSelect,FormWarehouseSelect,FormCollapse} from "../../components/form/index";

import {FormAdvancedItemModel} from "../components-v1/form-advanced-search";
import  {SelectType} from '../util/common';
import {FormCollapse} from "../components-v1/form-collapse";
import {FormStatusSelect} from "../components-v1/form-status-select";
import {FormExpressSelect} from "../components-v1/form-express-select";
import {FormWarehouseSelect} from "../components-v1/form-warehouse-select";

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
            }
        ];
        return items;
    }

    render() {
        return <Row className="demo-page">
            <FormCollapse>
                {/*<FormAdvancedSearch formAdvancedItems={topThis.renderFormAdvancedItems()} onClickSearch={(values) => {*/}
                    {/*console.log(values);*/}
                {/*}}></FormAdvancedSearch>*/}
            </FormCollapse>
        </Row>
    }
}