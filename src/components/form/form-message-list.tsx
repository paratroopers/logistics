import * as React from 'react';
import {List, Avatar, Spin} from 'antd';

interface FormMessageListProps {
}

interface FormMessageListStates {
    data: any,
    loading: boolean,
    hasMore: boolean,
}

export class FormMessageList extends React.Component<FormMessageListProps, FormMessageListStates> {
    constructor(props, content) {
        super(props, content);
        this.state = {
            data: [{
                last: '2017-08-19',
                email: '378183456@qq.com'
            }, {
                last: '2017-08-19',
                email: '378183456@qq.com'
            }, {
                last: '2017-08-19',
                email: '378183456@qq.com'
            }, {
                last: '2017-08-19',
                email: '378183456@qq.com'
            }],
            loading: false,
            hasMore: true,
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

    }

    render() {
        return <div className="demo-infinite-container">
            <List dataSource={this.state.data}
                  renderItem={item => (
                      <List.Item>
                          <List.Item.Meta
                              avatar={<Avatar
                                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                              title={<a href="https://ant.design">{item.last}</a>}
                              description={item.email}
                          />
                          <div></div>
                      </List.Item>
                  )}>
                {this.state.loading && this.state.hasMore && <Spin className="demo-loading"/>}
            </List>
        </div>;
    }
}