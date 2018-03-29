import * as React from 'react';
import {Table, message, Modal} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {RequestNameSpace} from '../model/request';
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
        let request: RequestNameSpace.DeleteRecipientsAddressRequest = {id: ID};
        APINameSpace.MemberAPI.DeleteRecipientsAddress(request).then((result) => {
            if (result.Data === "True") {
                message.success('删除成功');
                this.onLoad();
            }
        });
    }

    onOk() {
        const topThis = this
        const {props: {onOk},state:{selectRow}} = topThis;
        if (onOk)
            onOk(selectRow);
    }

    onCancel() {
        const topThis = this
        const {props: {onCancel}} = topThis;
        if (onCancel)
            onCancel();
    }

    renderTable() {
        let columns: ColumnProps<ModelNameSpace.AddressModel>[] = [{
            title: '收件人',
            dataIndex: 'recipient',
            key: 'recipient',
        }, {
            title: '国家',
            dataIndex: 'country',
            key: 'country',
        }, {
            title: '电话',
            dataIndex: 'Tel',
            key: 'Tel',
        }];

        return <Table loading={this.state.loading}
                      rowKey={"ID"}
                      defaultExpandAllRows={true}
                      expandedRowRender={record => <p style={{ margin: 0 }}>{`收货地址：${record.Address}`}</p>}
                      rowSelection={this.onRowSelection()}
                      dataSource={this.state.dataSource}
                      bordered={false}
                      columns={columns}
                      pagination={false}/>
    }

    render() {
        return <Modal className="form-contact-info" visible={this.state.visible} onOk={this.onOk.bind(this)} onCancel={this.onCancel.bind(this)}
                      title="选择联系人"
                      width={this.props.width}>
            {this.renderTable()}
        </Modal>
    }
}