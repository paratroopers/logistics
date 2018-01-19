import * as React from 'react';
import {BaseAPI} from '../../api/base';
import {List, Spin} from 'antd';
import {MessageLaterModel} from '../../api/model/base';
import {FormStepIcon, FormStepEnum} from '../form/form-step-icon';
import * as  moment from 'moment'

moment.locale('zh-cn');

interface FormMessageListProps {
    /*自动出现省略号*/
    layoutText?: boolean;
}

interface FormMessageListStates {
    loading: boolean,
    messageItems?: MessageLaterModel[];
    textStyle?: any;
}

export class FormMessageList extends React.Component<FormMessageListProps, FormMessageListStates> {
    defaultStyle = {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    }

    constructor(props, content) {
        super(props, content);
        this.state = {
            loading: false,
            textStyle: props.layoutText ? this.defaultStyle : {}
        }
    }

    componentDidMount() {
        this.getMessageData();
    }

    getMessageData() {
        this.setState({loading: true});
        BaseAPI.GetMesaageLatest().then(result => {
            if (result.Status === 0) {
                this.setState({messageItems: result.Data, loading: false});
            }
        });
    }

    renderItem(item: MessageLaterModel) {
        return <List.Item>
            <List.Item.Meta
                avatar={<FormStepIcon size={40}
                                      type={item.type as FormStepEnum}></FormStepIcon>}
                title={<div style={this.state.textStyle}>{item.message}</div>}
                description={moment(item.Created).fromNow()}/>
        </List.Item>;
    }

    render() {
        return <Spin spinning={this.state.loading}>
            <div className="demo-infinite-container">
                <List dataSource={this.state.messageItems}
                      renderItem={item => this.renderItem(item)}>
                </List>
            </div>
        </Spin>;
    }
}