import * as React from 'react';
import {BaseAPI} from '../../api/base';
import {List, Spin} from 'antd';
import {MessageLaterModel} from '../../api/model/base';
import {FormStepIcon, FormStepEnum} from '../form/form-step-icon';
import * as  moment from 'moment'

interface FormMessageListProps {
}

interface FormMessageListStates {
    loading: boolean,
    hasMore: boolean,
    messageItems?: MessageLaterModel[];
}

export class FormMessageList extends React.Component<FormMessageListProps, FormMessageListStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            loading: false,
            hasMore: true,
        }
    }

    componentDidMount() {
        this.getMessageData();
    }

    getMessageData() {
        BaseAPI.GetMesaageLatest().then(result => {
            if (result.Status === 0) {
                this.setState({messageItems: result.Data});
            }
        });
    }

    componentWillMount() {

    }

    renderItem(item: MessageLaterModel) {
        return <List.Item>
            <List.Item.Meta
                avatar={<FormStepIcon size={32}
                                      type={item.type as FormStepEnum}></FormStepIcon>}
                title={<a>{item.message}</a>}
                description={moment(item.Created).fromNow()}/>
            <div></div>
        </List.Item>;
    }

    render() {
        return <div className="demo-infinite-container">
            <List dataSource={this.state.messageItems}
                  renderItem={item => this.renderItem(item)}>
                {this.state.loading && this.state.hasMore && <Spin className="demo-loading"/>}
            </List>
        </div>;
    }
}