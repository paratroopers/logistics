import * as React from 'react';
import {Row,Col,Icon} from 'antd';
import {hashHistory} from 'react-router';

interface ContentHeaderControlProps{
    title?: React.ReactNode;
    extra?: React.ReactNode;
    isBackIcon?: boolean;
    onClickBack?: () => void;
}

interface ContentHeaderControlStates {

}

export class ContentHeaderControl extends React.Component<ContentHeaderControlProps, ContentHeaderControlStates> {
    constructor(props, context) {
        super(props, context);
    }

    /** 点击返回按钮*/
    onClickBack = () => {
        const topThis = this;
        const {props: {onClickBack}} = topThis;
        if (onClickBack) {
            onClickBack();
        } else {
            /** 返回路由*/
            hashHistory.goBack();
        }
    }

    render() {
        const topThis = this;
        const {props: {title, extra, isBackIcon}} = topThis;
        const backIcon = isBackIcon !== false ? <Icon type="left" onClick={topThis.onClickBack.bind(this)}/> : null;
        return <Row className="content-header-control" type="flex" justify="space-between" align="middle">
            <Col className="header-left">{backIcon}{title}</Col>
            <Col>{extra}</Col>
        </Row>;
    }
}