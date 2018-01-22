import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Col,Button,Input} from "antd";
import {FormAdvancedSearch,FormStatusSelect,FormExpressSelect,FormWarehouseSelect} from "../../components/form/index";
import {FormAdvancedItemModel} from "../../components/form/form-advanced-search";

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
                displayName:"控件",
                control: <Input></Input>
            }, {
                defaultDisplay: false,
                fieldName: "E",
                displayName:"控件",
                control: <Input></Input>
            }, {
                defaultDisplay: false,
                fieldName: "F",
                displayName:"控件",
                control: <Input></Input>
            }, {
                defaultDisplay: false,
                fieldName: "G",
                displayName:"控件",
                control: <Input></Input>
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