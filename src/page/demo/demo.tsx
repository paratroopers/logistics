import * as React from 'react';
import {withRouter} from 'react-router';
import {Row,Col,Button} from "antd";
import {ContentHeaderControl} from "../../components/controls/common/content-header-control";

interface DemoStates {

}

interface DemoProps {

}

@withRouter
export class DemoPage extends React.Component<DemoProps, DemoStates> {
    constructor(props) {
        super(props);
    }

    renderButton() {
        return <Row type="flex" justify="end" align="middle">
            <Col style={{marginRight: 16}}>
                <Button type="primary" icon="plus">新增入库</Button>
            </Col>
            <Col>
                <Button type="primary" icon="download">导出</Button>
            </Col>
        </Row>
    }

    render() {
        const topThis=this;
        return <Row className="demo-page">
            <ContentHeaderControl title="专属仓库" extra={topThis.renderButton()}></ContentHeaderControl>
        </Row>
    }
}