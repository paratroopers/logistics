import * as React from 'react';
import {Row, Col} from 'antd';

export interface FormSettingGroupProps {
    title?: string;
    size?: number;
    span?: number;
    footer?: JSX.Element;
}

export interface FormSettingGroupStates {

}

export class FormSettingGroup extends React.Component<FormSettingGroupProps, FormSettingGroupStates> {
    render() {
        const {props: {title, size, span, footer}} = this;
        return <Row className="form-control-group">
            <Col className="form-control-title" style={{fontSize: size}} span={24}>
                <span className="sign">{title}</span>
            </Col>
            <Col span={span}>
                {this.props.children}
            </Col>
            <Col span={span} className="form-control-button">
                {footer}
            </Col>
        </Row>
    }
}
