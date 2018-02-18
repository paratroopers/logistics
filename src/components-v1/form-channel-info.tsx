import * as React from 'react';
import {Table, Modal, message} from 'antd';
import {TableRowSelection} from 'antd/lib/table';
import {CommonTable, CommonColumnProps, ColumnLayout} from '../components-v1/common-table';
import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';


export interface FormChannelInfoProps {
    onOk?: (selected?: ModelNameSpace.ChannelModal) => void;
    onChanel?: () => void;
    visible?: boolean;
    width?: number;
}

export interface FormChannelInfoStates {
    selectRow?: ModelNameSpace.ChannelModal;
    data?: ModelNameSpace.ChannelModal[];
}

class FormChannelInfoTable extends CommonTable<any> {
}

export class FormChannelInfo extends React.Component<FormChannelInfoProps, FormChannelInfoStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectRow: null,
            data: [],
        }
    }

    componentDidMount() {
        this.getData(1);
    }

    getData(pageIndex?: number) {
        APINameSpace.CustomerOrderAPI.GetChannels().then(r => {
            if (r.Status === 0) {
                this.setState({
                    data: r.Data
                });
            }
        });
    }

    renderTable() {
        const columns: CommonColumnProps<any>[] = [
            {
                title: '渠道名称',
                dataIndex: 'Name',
                width: '15%',
                layout: ColumnLayout.LeftTop
            },
            {
                title: '时间',
                dataIndex: 'Prescription',
                width: '15%',
                layout: ColumnLayout.LeftBottom
            },
            {
                title: '重量限制',
                dataIndex: 'WeightLimit',
                width: '20%',
                render: (txt) => {
                    return <div style={{width: '120px'}} className="txtislong" title={txt}>{txt}</div>
                },
                layout: ColumnLayout.RightTop
            },
            {
                title: '体积限制',
                dataIndex: 'SizeLimit',
                width: '20%',
                render: (txt) => {
                    return <div style={{width: '120px'}} className="txtislong" title={txt}>{txt}</div>
                },
                layout: ColumnLayout.RightBottom
            },
            {
                title: '备注',
                dataIndex: 'Remark',
                width: '30%',
                render: (txt) => {
                    return <div style={{width: '150px'}} className="txtislong" title={txt}>{txt}</div>
                }
            }
        ];
        return <FormChannelInfoTable columns={columns}
                                     rowKey={"ID"}
                                     rowSelection={this.onRowSelection()}
                                     bordered={false}
                                     pagination={false}
                                     dataSource={this.state.data}></FormChannelInfoTable>
    }

    onRowSelection(): TableRowSelection<any> {
        return {
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selectRow: selectedRows[0]});
            }
        }
    };

    onOk() {
        if (this.state.selectRow)
            this.props.onOk && this.props.onOk(this.state.selectRow)
        else
            message.warning('请选择渠道');
    }

    render() {
        const {props: {visible, onChanel, width}} = this;
        return <Modal visible={visible}
                      width={width ? width : 800}
                      title="渠道选择"
                      onOk={this.onOk.bind(this)}
                      onCancel={() => onChanel && onChanel()}>
            {this.renderTable()}
        </Modal>
    }
}