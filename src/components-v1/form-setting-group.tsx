import * as React from 'react';
import {Row, Col, Spin, Icon} from 'antd';
import * as classNames from 'classnames';

export interface FormSettingGroupProps {
    title?: string;
    tabBar?: JSX.Element;
    loading?: boolean;
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
        const {props: {loading, title, tabBar}, state: {isHidden}} = this;
        let className = classNames({
            "hidden": isHidden
        }, "akfc-section-content");
        return <Spin spinning={(loading === true)}>
            <div className="header-section" style={{marginBottom: '20px'}}>
                <Row type="flex" align="top" justify="space-between" className="header-section-title">
                    <Col>
                        <span className="titleSpan"></span>
                        {title}
                    </Col>
                    <Col>
                    </Col>
                    <Col className="fold">
                        {
                            isHidden ? <Icon type="down" onClick={this.onShow.bind(this)}></Icon>
                                : <Icon type="up" onClick={this.onHide.bind(this)}></Icon>
                        }
                    </Col>
                </Row>
                <div className={className}>
                    {
                        tabBar ? <Row type="flex" justify="start" align="bottom" style={{marginBottom: '10px'}}>
                            <Col span={16}>
                                {tabBar}
                            </Col>
                        </Row> : null
                    }
                    {this.props.children}
                </div>
            </div>
        </Spin>
    }
}
