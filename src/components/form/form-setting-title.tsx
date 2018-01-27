import * as React from 'react';
import {Row, Col} from 'antd';

export interface FormSettingTitleProps {
    title?: string;
    size?: number;
}

export interface FormSettingTitleStates {

}

export class FormSettingTitle extends React.Component<FormSettingTitleProps, FormSettingTitleStates> {
    render() {
        const {props: {title, size}} = this;
        return <Row className="form-control-title" style={{fontSize: size}}>
            <Col span={24} className="sign">
                <span>{title}</span>
            </Col>
        </Row>
    }
}
