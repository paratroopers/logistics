import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Table, Button, Divider} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import {FormControl} from '../components-v1/form-control';
import {MemberAddressAdd} from '../components-v1/member-address';
import Form from "antd/lib/form/Form";



// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressPageAddStates {
    dataSource: any;
}

interface MemberAddressPageAddProps {

}

@withRouter
export class MemberAddressPageAdd extends React.Component<MemberAddressPageAddProps, MemberAddressPageAddStates> {
    constructor(props) {
        super(props);
        this.state = {dataSource: []};
    }



    componentDidMount() {

    }

    render() {
          const MemberAddressAddForm = Form.create()(MemberAddressAdd);
        return (<Row className="member-address-page">
            <ContentHeaderControl title="添加收件人"></ContentHeaderControl>
            <MemberAddressAddForm></MemberAddressAddForm>
        </Row>)
    }

}