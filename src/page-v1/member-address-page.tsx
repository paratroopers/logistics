import * as React from 'react';
import {withRouter,hashHistory} from 'react-router';
import {Row, Table, Button, Divider} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormControl} from '../components-v1/form-control';
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import {PathConfig} from "../config/pathconfig";
import {ClickParam} from "antd/lib/menu";
import {ColumnProps, RowSelectionType, TableRowSelection} from "antd/lib/table";



// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressPageStates {
    dataSource: any;
    selectRow?:any;
}

interface MemberAddressPageProps {
    selectValue:()=>{},

}

@withRouter
export class MemberAddressPage extends React.Component<MemberAddressPageProps, MemberAddressPageStates> {
    constructor(props) {
        super(props);
        this.state = {dataSource: [],selectRow:[]};
    }

    returnVaule = [];

    loadData() {
        APINameSpace.MemberAPI.GetRecipientsAddressAll().then((result) => {
            if (result.Data !== null) {
                result.Data.map((r) => {
                    this.returnVaule.push({
                        key: r.ID,
                        recipient: r.recipient,
                        country: r.country,
                        Address: r.Address,
                        Tel: r.Tel
                    });
                });
                this.setState({dataSource: this.returnVaule});
            }
        });
    }

    columns:ColumnProps<ModelNameSpace.AddressModel>[]= [{
        title: '收件人',
        dataIndex: 'recipient',
        key: 'recipient',
    }, {
        title: '国家',
        dataIndex: 'country',
        key: 'country',
    }, {
        title: '地址',
        dataIndex: 'Address',
        key: 'Address',
    }, {
        title: '电话',
        dataIndex: 'Tel',
        key: 'Tel',
    }, {
        title: '操作',
        fixed: 'right',
        render: (val, record, index) => {
            const menu:FormTableOperationModel[]=[
                {
                    key: PathConfig.WarehouseInViewPage,
                    type: "search",
                    label: "查看"
                },
                {
                    key: PathConfig.WarehouseInEditPage,
                    type: "edit",
                    label: "编辑"
                }
            ]

            return <FormTableOperation onClick={(param:ClickParam)=>{
                hashHistory.push({pathname:param.key,state:record});
            }} value={menu}></FormTableOperation>;
        }
    }];


    rowSelection:TableRowSelection<any> = {
        type:"radio",
        onChange: (selectedRowKeys, selectedRows) => {
           // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({selectRow:selectedRows});

            console.log(this.state.selectRow);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
        }),
    };

    savingdata = () => {
        return true;
    };

    componentDidMount() {
        this.loadData();
    }
    

    render() {
        return (<Row className="member-address-page">
            <ContentHeaderControl title="收件人地址"></ContentHeaderControl>
            <FormControl.FormButtonControl title="确认" type={ModelNameSpace.ButtonTypeEnum.confirm}/>
            {/*<FormControl.FormButtonControl savingdata=true title="新增收件人" type={ModelNameSpace.ButtonTypeEnum.add}/>*/}
            <Table  rowKey={"ID"} rowSelection={this.rowSelection} dataSource={this.state.dataSource} columns={this.columns} pagination={false}/>
        </Row>)
    }

}