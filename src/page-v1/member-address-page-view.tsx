import * as React from 'react';
import {withRouter,RouteComponentProps} from 'react-router';
import {Row, Table, Button, Divider} from "antd";
import {APINameSpace} from '../model/api';
import {ModelNameSpace} from '../model/model';
import {requestNameSpace} from '../model/request';
import {ResponseNameSpace} from '../model/response';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import  MemberAddressEidtView from '../components-v1/member-address';



// import {ContentHeaderControl}from "../../../components/controls/common/content-header-control";

interface MemberAddressPageStates {
    dataSource: any;
}

interface MemberAddressPageProps extends RouteComponentProps<any, any> {

}

@withRouter
export class MemberAddressPageView extends React.Component<MemberAddressPageProps, MemberAddressPageStates> {
    constructor(props) {
        super(props);

    }


    render() {
        const viewData: ModelNameSpace.AddressModel = this.props.location.state;
        return (<Row className="member-address-page">
            <ContentHeaderControl title="查看收件人"></ContentHeaderControl>
            <MemberAddressEidtView model={viewData} type={ModelNameSpace.FormOpertationEnum.view}/>

            {/*pagination={false}/>*/}
        </Row>)
    }

}