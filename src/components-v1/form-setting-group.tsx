import * as React from 'react';
import {Row, Col, Spin, Icon} from 'antd';
import * as classNames from 'classnames';

export interface FormSettingGroupProps {
    title?: string;
    topBar?: JSX.Element;
    loading?: boolean;
    telescopic?: boolean;
}

export interface FormSettingGroupStates {
    isHidden?: boolean;
}

export class FormSettingGroup extends React.Component<FormSettingGroupProps, FormSettingGroupStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isHidden: false
        }
    }

    onHide() {
        this.setState({isHidden: true});
    }

    onShow() {
        this.setState({isHidden: false});
    }

    render() {
        const {props: {loading, title, topBar, telescopic}, state: {isHidden}} = this;
        let className = classNames({
            "hidden": isHidden
        }, "form-setting-group-content");
        return <Spin spinning={(loading === true)}>
            <div className="form-setting-group">
                <Row type="flex" align="top" justify="space-between" className="form-setting-group-title">
                    <Col className="title">
                        <span className="title-left-span"></span>
                        {title}
                    </Col>
                    <Col>
                    </Col>
                    <Col className="fold">
                        {
                            telescopic ? (
                                isHidden ? <Icon type="down" onClick={this.onShow.bind(this)}></Icon>
                                    : <Icon type="up" onClick={this.onHide.bind(this)}></Icon>) : null
                        }
                    </Col>
                </Row>
                <div className={className}>
                    {
                        topBar ? <Row type="flex" justify="start" align="bottom" className="top-bar">
                            <Col span={24}>
                                {topBar}
                            </Col>
                        </Row> : null
                    }
                    {this.props.children}
                </div>
            </div>
        </Spin>
    }
}
