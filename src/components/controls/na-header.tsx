import * as React from "react";
import {Component} from "react";
import {Row, Col} from 'antd';

interface NaHeaderProps {
    className?: string;
    logoName?: string | React.ReactNode;
    logo?: string | React.ReactNode;
    onClickLogo?: () => void;
}

interface NaHeaderStates {

}

export default class NaHeader extends Component<NaHeaderProps, NaHeaderStates> {
    constructor(props, context) {
        super(props, context);
    }

    /* 导航*/
    renderNavigation() {
        const topThis = this;
        return <Col>renderNavigation</Col>;
    }

    /* 工具*/
    renderTool() {
        const topThis = this;
        return <Col>renderTool</Col>;
    }

    onClickLogo() {
        const topThis = this;
        const {props: {onClickLogo}} = topThis;
        if (onClickLogo)
            onClickLogo();
    }

    render() {
        const topThis = this;
        const {props: {className, logo, logoName}} = topThis;
        return <Row className={className ? className + " na-header" : "na-header"}>
            <Col xs={24} sm={24} md={8} lg={8} xl={5}>
                <a className="logo" onClick={topThis.onClickLogo.bind(this)}>
                    {typeof logo === "string" ? <img src={logo}></img> : logo}
                    {typeof logoName === "string" ? <span>{logoName}</span> : logoName}
                </a>
            </Col>
            <Col xs={0} sm={0} md={16} lg={16} xl={19}>
                <Row type="flex" justify="space-between">
                    {topThis.renderNavigation()}
                    {topThis.renderTool()}
                </Row>
            </Col>
        </Row>;
    }
}

