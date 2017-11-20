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
        return null;
    }

    /* 工具*/
    renderTool() {
        const topThis = this;
        return null;
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
            <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                <a className="logo" onClick={topThis.onClickLogo.bind(this)}>
                    {typeof logo === "string" ? <img src={logo}></img> : logo}
                    {typeof logoName === "string" ? <span>{logoName}</span> : logoName}
                </a>
            </Col>
            <Col xs={2} sm={4} md={6} lg={8} xl={10}></Col>
        </Row>;
    }
}

