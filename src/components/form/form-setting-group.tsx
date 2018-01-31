import * as React from 'react';
import {Row, Col, Spin} from 'antd';

export interface FormSettingGroupProps {
    title?: string;
    size?: number;
    span?: number;
    footer?: JSX.Element;
    loading?: boolean;
    header?: JSX.Element;
}

export interface FormSettingGroupStates {

}

export class FormSettingGroup extends React.Component<FormSettingGroupProps, FormSettingGroupStates> {
    render() {
        const {props: {title, size, span, footer, loading, header}} = this;
        return <Spin spinning={(loading === true)}>
            <Row className="form-control-group">
                <Col className="form-control-title" style={{fontSize: size}} span={24}>
                    <span className="sign">{title}</span>
                    {header}
                </Col>
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
        </Spin>
    }
}
