import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Table, Button, Divider} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";

// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressCombinationPageStates {
    dataSource:any;
}

interface MemberAddressCombinationPageProps {

}

@withRouter
export class MemberAddressCombinationPage extends React.Component<MemberAddressCombinationPageProps, MemberAddressCombinationPageStates> {
    constructor(props) {
        super(props);
        this.state ={dataSource:[]};
    }

    returnVaule = [];
    loadData(){
        APINameSpace.MemberAPI.GetRecipientsAddressAll().then((result)=>{
            if (result.Data !== null){
                result.Data.map((r) =>{
                    this.returnVaule.push({key:r.ID,recipient:r.recipient,country:r.country,Address:r.Address,Tel:r.Tel});
                });
                this.setState({dataSource:this.returnVaule});
            }
        });
    }

    columns = [{
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

    componentDidMount(){
        this.loadData();
    }

    render() {
        return (<Row className="member-address-page">
            <ContentHeaderControl title="收件人地址"></ContentHeaderControl>
            <Button type="primary">
                确认
            </Button>
            <Button type="primary">
                新增收件人
            </Button>
            <Table rowSelection={this.rowSelection} dataSource={this.state.dataSource} columns={this.columns}  pagination ={false}/>
        </Row>)
    }

}