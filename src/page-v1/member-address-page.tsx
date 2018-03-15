import * as React from 'react';
import {withRouter, hashHistory} from 'react-router';
import {Row, Table, Button, message, Popconfirm} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {RequestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormControl} from '../components-v1/form-control';
import {PathConfig} from "../config/pathconfig";
import {ClickParam} from "antd/lib/menu";
import {ColumnProps, RowSelectionType, TableRowSelection} from "antd/lib/table";
import {
    FormTableOperation,
    FormTableOperationModel,
    FormTableOperationEnum
} from "../components-v1/form-table-operation";


// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressPageStates {
    dataSource?: ModelNameSpace.AddressModel[];
    selectRow?: ModelNameSpace.AddressModel;
    loading?: boolean;
}

interface MemberAddressPageProps {
    selectValue?: () => any
    onOk?: (user: ModelNameSpace.AddressModel) => void;
    showOKButton?: boolean;
    showTableSelect?: boolean;
}

@withRouter
export class MemberAddressPage extends React.Component<MemberAddressPageProps, MemberAddressPageStates> {
    constructor(props) {
        super(props);
        this.state = {dataSource: [], selectRow: {}, loading: false};
    }


    loadData() {
        this.setState({loading: true});
        APINameSpace.MemberAPI.GetRecipientsAddressAll().then((result) => {
            if (result.Data !== null) {
                this.setState({dataSource: result.Data, loading: false});
            }
        });
    }

    deleteDataByID(ID: string) {
        let request: RequestNameSpace.DeleteRecipientsAddressRequest = {id: ID};
        APINameSpace.MemberAPI.DeleteRecipientsAddress(request).then((result) => {
            if (result.Data === "True") {
                message.success('删除成功');
                this.loadData();
            }
        });
    }

    columns: ColumnProps<ModelNameSpace.AddressModel>[] = [{
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
        render: (val, record, index) => {
            const menu: FormTableOperationModel[] = [
                {
                    key: FormTableOperationEnum.View,
                    type: "search",
                    label: "查看",
                    path: PathConfig.MemberAddressPageView
                },
                {
                    key: FormTableOperationEnum.Edit,
                    type: "edit",
                    label: "编辑",
                    path: PathConfig.MemberAddressPageEdit
                },
                {
                    key: FormTableOperationEnum.Detele,
                    type: "delete",
                    label: "删除"
                }
            ]

            return <FormTableOperation onClick={(param: ClickParam) => {
                if (param.key === FormTableOperationEnum.Detele.toString()) {
                    this.deleteDataByID(record.ID);
                }
                else {
                    const path = menu.filter(r => r.key.toString() === param.key)[0].path;
                    hashHistory.push({pathname: path, state: record});
                }

            }} value={menu}></FormTableOperation>;
        }
    }];


    rowSelection: TableRowSelection<any> = {
        type: "radio",
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState({selectRow: selectedRows[0]});
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
        }),
    };


    componentDidMount() {
        this.loadData();
    }

    returnUrl() {
        hashHistory.push(PathConfig.MemberAddressPageAdd);
    }

    onOk(user: ModelNameSpace.AddressModel) {
        this.props.onOk && this.props.onOk(user);
    }

    render() {
        return (<Row className="member-address-page">
            <ContentHeaderControl title="收件人地址"></ContentHeaderControl>
            {this.props.showOKButton ? <Button type="primary" onClick={this.onOk.bind(this)}>确认</Button> : null}
            <Button type="primary" onClick={this.returnUrl.bind(this)}>
                新增联系人
            </Button>
            <Table loading={this.state.loading} rowKey={"ID"}
                   rowSelection={this.props.showOKButton ? this.rowSelection : null}
                   dataSource={this.state.dataSource} columns={this.columns} pagination={false}/>
        </Row>)
    }

}