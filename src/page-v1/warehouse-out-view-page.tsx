import * as React from 'react';
import {withRouter, RouteComponentProps} from 'react-router';
import {
    FormTableDetailPage
} from "../components-v1/all-components-export";
import {FormComponentProps} from 'antd/lib/form/Form';
import {ModelNameSpace} from '../model/model';

interface WarehouseOutViewPageProps extends RouteComponentProps<any, any>, FormComponentProps {

}

interface WarehouseOutViewPageStates {
    selectedKey?: string;
    step?: ModelNameSpace.OrderTypeEnum;
}

export interface QueryData {
    id?: string;
    step?: string;
}

@withRouter
export class WarehouseOutViewPage extends React.Component<WarehouseOutViewPageProps, WarehouseOutViewPageStates> {

    constructor(props) {
        super(props);
        const data = this.props.location.query as QueryData;
        this.state = {
            selectedKey: data.id,
            step: parseInt(data.step) as ModelNameSpace.OrderTypeEnum,
        }
    }

    render() {
        return <FormTableDetailPage ID={this.state.selectedKey}
                                    Title="查看"
                                    Step={this.state.step}
                                    readyOnly></FormTableDetailPage>
    }
}