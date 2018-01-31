import * as React from 'react';
import {Row,Col,Icon,Button} from 'antd';
import {hashHistory} from 'react-router';

interface CommonConfirmControlProps{
    title?: React.ReactNode;
    extra?: React.ReactNode;
    isBackIcon?: boolean;
    onClickBack?: () => void;
    loading?:boolean;
}

interface CommonConfirmControlStates {
    loading: boolean;
}

export class CommonConfirmControl extends React.Component<CommonConfirmControlProps, CommonConfirmControlStates> {
    constructor(props, context) {
        super(props, context);
        this.state ={loading:false}
    }

    enterLoading = () => {
        this.setState({ loading: true });
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