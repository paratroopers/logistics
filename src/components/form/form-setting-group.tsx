import * as React from 'react';
import {Row, Col} from 'antd';

export interface FormSettingGroupProps {
    title?: string;
    size?: number;
    span?: number;
}

export interface FormSettingGroupStates {

}

export class FormSettingGroup extends React.Component<FormSettingGroupProps, FormSettingGroupStates> {
    render() {
        const {props: {title, size, span}} = this;
        return <Row className="form-control-group">
            <Col className="form-control-title" style={{fontSize: size}} span={24}>
                <span className="sign">{title}</span>
            </Col>
            <Col span={span}>
                {this.props.children}
            </Col>
        </Row>
    }
}
