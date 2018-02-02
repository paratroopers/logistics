import * as React from 'react';
import {Row, Col, Spin, Collapse} from 'antd';

export interface FormSettingGroupProps {
    title?: string;
    size?: number;
    span?: number;
    footer?: JSX.Element;
    loading?: boolean;
}

export interface FormSettingGroupStates {

}

export class FormSettingGroup extends React.Component<FormSettingGroupProps, FormSettingGroupStates> {
    render() {
        const {props: {title, size, span, footer, loading}} = this;
        return <Spin spinning={(loading === true)}>
            <Collapse className="form-control-group" defaultActiveKey={['1']}>
                <Collapse.Panel key="1" header={title} style={{fontSize: size}} showArrow={false} className="panel">
                    <Row>
                        {!loading ?
                            [
                                <Col key="children" span={span}>
                                    {this.props.children}
                                </Col>,
                                <Col key="footer" span={span} className="form-control-button">
                                    {footer}
                                </Col>
                            ] : null
                        }
                    </Row>
                </Collapse.Panel>
            </Collapse>
        </Spin>
    }
}