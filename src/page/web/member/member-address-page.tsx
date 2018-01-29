import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Table, Button, Divider} from "antd";
// import  {} from '';


import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressPageStates {
    // dataSource:[]
}

interface MemberAddressPageProps {

}

@withRouter
export class MemberAddressPage extends React.Component<MemberAddressPageProps, MemberAddressPageStates> {
    constructor(props) {
        super(props);
    }

     dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    }];

     columns = [{
         title: 'ID',
         dataIndex: 'ID',
         key: 'ID',
     },{
        title: '收件人',
        dataIndex: 'recipient',
        key: 'recipient',
    }, {
        title: '收件人国家',
        dataIndex: 'country',
        key: 'country',
    }, {
        title: '收件人地址',
        dataIndex: 'Address',
        key: 'Address',
    },{
         title: '电话',
         dataIndex: 'Tel',
         key: 'Tel',
     },{
         title: '',
         key: 'action',
         render: (text, record) => (
             <span>
      <a href="#">查看</a>
      <Divider type="vertical" />
      <a href="#">修改</a>
      <Divider type="vertical" />
      <a href="#">删除</a>
    </span>
         ),
     }];


     rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
        }),
    };


    render() {
        return (<Row className="member-address-page">
            <ContentHeaderControl title="收件人地址"></ContentHeaderControl>
            <Button type="primary">
                确认
            </Button>
            <Table rowSelection={this.rowSelection} dataSource={this.dataSource} columns={this.columns} />
        </Row>)
    }

}