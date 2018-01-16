import * as React from 'react';
import {withRouter} from 'react-router';
import { Row, Col,Card,Button} from 'antd';
import FormAdvancedSearch from "../../../components/form/form-advanced-search";

interface WarehouseStoragePageProps {

}

interface WarehouseStoragePageStates {

}

@withRouter
export class WarehouseStoragePage extends React.Component<WarehouseStoragePageProps, WarehouseStoragePageStates> {
    constructor(props) {
        super(props);
    }

    renderButton(){
        return <Row>
            <Col>
                <Button type="primary">新增入库</Button>
            </Col>
        </Row>
    }

    render() {
        const topThis = this;
        return <Row className="warehouse-storage-page">
            <Col span={24}>
                <Card title={"入库操作"} extra={topThis.renderButton()}>
                    <FormAdvancedSearch></FormAdvancedSearch>
                </Card>
            </Col>
        </Row>;
    }
}