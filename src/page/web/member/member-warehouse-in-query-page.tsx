import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Table, Menu} from "antd";
import {ColumnProps} from 'antd/lib/table';
import {ContentHeaderControl} from "../../../components/controls/common/content-header-control";

interface MemberWarehouseInQueryPageStates {
    data?: any;
}

interface MemberWarehouseInQueryPageProps {

}

class MemberWarehouseInQueryTable extends Table<any> {
}

@withRouter
export class MemberWarehouseInQueryPage extends React.Component<MemberWarehouseInQueryPageProps, MemberWarehouseInQueryPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            data: [{
                orderName: '1',
                code: '1',
                mode: '1',
                status: '1',
                date: '1',
                service: '1',
                handle: '1',
                id: '1'
            }, {
                orderName: '1',
                code: '1',
                mode: '1',
                status: '1',
                date: '1',
                service: '1',
                handle: '1',
                id: '2'
            }]
        }
    }

    renderTable() {
        const columns: ColumnProps<any>[] = [
            {
                title: 'orderName',
                dataIndex: 'orderName'
            },
            {
                title: 'code',
                dataIndex: 'code'
            },
            {
                title: 'mode',
                dataIndex: 'mode'
            },
            {
                title: 'status',
                dataIndex: 'status'
            },
            {
                title: 'date',
                dataIndex: 'date'
            },
            {
                title: 'service',
                dataIndex: 'service'
            },
            {
                title: 'handle',
                dataIndex: 'handle',
                render: (txt, record) => {
                    return <Menu></Menu>
                }
            }
        ];
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            }
        };

        return <MemberWarehouseInQueryTable rowKey="id" rowSelection={rowSelection} columns={columns}
                                            dataSource={this.state.data}/>
    }

    render() {
        return <Row className="member-warehouse-in-query-page">
            <ContentHeaderControl title="入库查询"></ContentHeaderControl>
            <Row>
                {this.renderTable()}
            </Row>
        </Row>
    }
}