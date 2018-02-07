import * as React from 'react';
import {Table, Modal} from 'antd';
import {ColumnProps, TableRowSelection} from 'antd/lib/table';


export interface FormChannelInfoProps {
    onOk?: (id?: string) => void;
    onChanel?: () => void;
    visible?: boolean;
}

export interface FormChannelInfoStates {
    selectRow?: any;
}

class FormChannelInfoTable extends Table<any> {
}

export class FormChannelInfo extends React.Component<FormChannelInfoProps, FormChannelInfoStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectRow: null
        }
    }

    renderTable() {
        const columns: ColumnProps<any>[] = [
            {
                title: '渠道名称',
                dataIndex: 'channelName'
            },
            {
                title: '价格',
                dataIndex: '2'
            },
            {
                title: '服务费',
                dataIndex: '3'
            }
        ];
        return <FormChannelInfoTable columns={columns}
                                     rowKey={"id"}
                                     rowSelection={this.onRowSelection()}
                                     bordered={false}
                                     pagination={false}
                                     dataSource={[{
                                         channelName: '顺丰',
                                         2: '188',
                                         3: '36',
                                         id: 1
                                     }]}></FormChannelInfoTable>
    }

    onRowSelection(): TableRowSelection<any> {
        return {
            type: "radio",
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({selectRow: selectedRows[0]});
            }
        }
    };

    render() {
        const {props: {visible, onOk, onChanel}} = this;
        return <Modal visible={visible}
                      title="渠道选择"
                      onOk={() => onOk && onOk()}
                      onCancel={() => onChanel && onChanel()}>
            {this.renderTable()}
        </Modal>
    }
}