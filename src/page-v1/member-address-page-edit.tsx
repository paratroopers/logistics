import * as React from 'react';
import {withRouter,RouteComponentProps} from 'react-router';
import {Row, Table, Button, Divider} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {RequestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormControl} from '../components-v1/form-control';
import  MemberAddressEidtView from '../components-v1/member-address';



// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressPageStates {

}

interface MemberAddressPageProps extends  RouteComponentProps<any, any> {

}

@withRouter
export class MemberAddressPageEdit extends React.Component<MemberAddressPageProps, MemberAddressPageStates> {
    constructor(props) {
        super(props);
    }

    render() {
        const viewData: ModelNameSpace.AddressModel = this.props.location.state;

        return (<Row className="member-address-page">
            <ContentHeaderControl title="编辑收件人"></ContentHeaderControl>
            <MemberAddressEidtView model={viewData} type={ModelNameSpace.FormOpertationEnum.edit}/>
            {/*<FormControl.FormButtonControl savingdata={this.savingdata} title="确认" type={ModelNameSpace.ButtonTypeEnum.confirm}/>*/}
            {/*<FormControl.FormButtonControl savingdata={this.savingdata} title="新增收件人" type={ModelNameSpace.ButtonTypeEnum.add}/>*/}
            {/*<Table rowSelection={this.rowSelection} dataSource={this.state.dataSource} columns={this.columns}*/}
                   {/*pagination={false}/>*/}
        </Row>)
    }

}