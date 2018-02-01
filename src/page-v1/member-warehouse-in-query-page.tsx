import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Table, Menu, Dropdown, Icon, Alert, Button, Tabs} from "antd";

import {ModelNameSpace} from '../model/model';
import {APINameSpace} from '../model/api';
import {ContentHeaderControl} from "../components-v1/common-content-header";
import * as moment from 'moment';

interface MemberWarehouseInQueryPageStates {
    pageIndex: number;
    pageSize: number;
    data?: ModelNameSpace.CustomerOrderModel[];
}

interface MemberWarehouseInQueryPageProps {
}


@withRouter
export class MemberWarehouseInQueryPage extends React.Component<MemberWarehouseInQueryPageProps, MemberWarehouseInQueryPageStates> {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 20,
            data: []
        }
    }


    render() {
        return <Row className="member-warehouse-in-query-page">
            <ContentHeaderControl title="入库查询"></ContentHeaderControl>
        </Row>
    }
}