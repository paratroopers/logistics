import * as React from 'react';
import {Table, message, Modal} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {requestNameSpace} from '../model/request';
import {FormTableOperation, FormTableOperationModel} from "../components-v1/form-table-operation";
import {PathConfig} from "../config/pathconfig";
import {ClickParam} from "antd/lib/menu";
import {ColumnProps, TableRowSelection} from "antd/lib/table";

export interface FormContactInfoProps {
    readOnly?: boolean;
    onOk?: (user: ModelNameSpace.AddressModel) => void;
    onCancel?: () => void;
    visible?: boolean;
    width?: number;
}

export interface FormContactInfoStates {
    dataSource?: ModelNameSpace.AddressModel[];
    selectRow?: ModelNameSpace.AddressModel;
    loading?: boolean;
    visible?: boolean;
    width?: number;
}

export class FormContactInfo extends React.Component<FormContactInfoProps, FormContactInfoStates> {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            selectRow: {},
            loading: false,
            visible: props.visible,
            width: props.width ? props.width : 600
        };
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({visible: nextProps.visible});
        }
    }

    componentDidMount() {
        this.onLoad();
    }

    onLoad() {
        this.setState({loading: true});
        APINameSpace.MemberAPI.GetRecipientsAddressAll().then((result) => {
            if (result.Data !== null) {
                this.setState({dataSource: result.Data, loading: false});
            }
        });
    }

    onRowSelection(): TableRowSelection<any> {
        return {
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selectRow: selectedRows[0]});
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        }
    };

    onDeleteByID(ID: string) {
        let request: requestNameSpace.DeleteRecipientsAddressRequest = {id: ID};
        APINameSpace.MemberAPI.DeleteRecipientsAddress(request).then((result) => {
            if (result.Data === "True") {
                message.success('删除成功');
                this.onLoad();
            }
        });
    }

    onOk() {
        this.props.onOk && this.props.onOk(this.state.selectRow);
    }

    onCancel() {
        this.props.onCancel && this.props.onCancel();
    }


    renderTable() {
        let columns: ColumnProps<ModelNameSpace.AddressModel>[] = [{
            title: '收件人',
            dataIndex: 'recipient',
            key: 'recipient',
            width: '15%'
        }, {
            title: '国家',
            dataIndex: 'country',
            key: 'country',
            width: '10%'
        }, {
            title: '地址',
            dataIndex: 'Address',
            key: 'Address',
            width: '55%'
        }, {
            title: '电话',
            dataIndex: 'Tel',
            key: 'Tel',
            width: '20%'
        }];

        (!this.props.readOnly) && columns.push({
            title: '操作',
            width: '15%',
            render: (val, record, index) => {
                const menu: FormTableOperationModel[] = [
                    {
                        key: PathConfig.MemberAddressPageView,
                        type: "search",
                        label: "查看"
                    },
                    {
                        key: PathConfig.MemberAddressPageEdit,
                        type: "edit",
                        label: "编辑"
                    },
                    {
                        key: "delete",
                        type: "delete",
                        label: "删除"
                    }
                ]
                return <FormTableOperation onClick={(param: ClickParam) => {
                    if (param.key === "delete") {
                        this.onDeleteByID(record.ID);
                    }
                }} value={menu}></FormTableOperation>;
            }
        })


        return <Table loading={this.state.loading}
                      rowKey={"ID"}
                      rowSelection={this.onRowSelection()}
                      dataSource={this.state.dataSource}
                      bordered={false}
                      columns={columns}
                      pagination={false}/>
    }

    render() {
        return <Modal visible={this.state.visible} onOk={this.onOk.bind(this)} onCancel={this.onCancel.bind(this)}
                      title="选择联系人"
                      width={this.props.width}>
            {this.renderTable()}
        </Modal>
    }
}