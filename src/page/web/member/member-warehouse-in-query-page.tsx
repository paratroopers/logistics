import * as React from 'react';
import {withRouter} from 'react-router';
import {Row, Table, Menu, Dropdown, Icon, Alert, Button, Tabs} from "antd";
import {ColumnProps} from 'antd/lib/table';
import {MemberAPI} from '../../../api/member';
import {CustomerOrderModel} from '../../../api/model/member';
import {CustomerOrdersRequest} from '../../../api/model/request/member-request';
import {ContentHeaderControl} from "../../../components/controls/common/content-header-control";
import * as moment from 'moment';

interface MemberWarehouseInQueryPageStates {
    pageIndex: number;
    pageSize: number;
    data?: CustomerOrderModel[];
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