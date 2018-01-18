import * as React from 'react';
import {BaseAPI} from '../../api/base';
import {List, Spin} from 'antd';
import {MessageLaterModel} from '../../api/model/base';
import {FormStepIcon, FormStepEnum} from '../form/form-step-icon';
import * as  moment from 'moment'
moment.locale('zh-cn');

interface FormMessageListProps {
}

interface FormMessageListStates {
    loading: boolean,
    messageItems?: MessageLaterModel[];
}

export class FormMessageList extends React.Component<FormMessageListProps, FormMessageListStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            loading: false
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
                avatar={<FormStepIcon size={32}
                                      type={item.type as FormStepEnum}></FormStepIcon>}
                title={<a>{item.message}</a>}
                description={moment(item.Created).fromNow()}/>
            <div></div>
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