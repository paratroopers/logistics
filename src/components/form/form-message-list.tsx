import * as React from 'react';
import {List, Avatar, Spin} from 'antd';
import {InfiniteScroll} from 'react-infinite-scroller';

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
            data: [],
            loading: false,
            hasMore: true,
        }
    }

    componentWillMount() {
        this.getData();
    }

    getData() {

    }


    handleInfiniteOnLoad() {
        let data = this.state.data;
        this.setState({
            loading: true,
        });
        if (data.length > 14) {
            this.setState({
                hasMore: false,
                loading: false,
            });
            return;
        }
        this.getData();
    }

    render() {
        return <div className="demo-infinite-container">
            <InfiniteScroll
                initialLoad={false}
                pageStart={0}
                loadMore={this.handleInfiniteOnLoad}
                hasMore={!this.state.loading && this.state.hasMore}
                useWindow={false}>
                <List dataSource={this.state.data}
                      renderItem={item => (
                          <List.Item key={item.id} extra={null}>
                              <List.Item.Meta
                                  avatar={<Avatar
                                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                                  title={<a href="https://ant.design">{item.name.last}</a>}
                                  description={item.email}
                              />
                              <div>Content</div>
                          </List.Item>
                      )}>
                    {this.state.loading && this.state.hasMore && <Spin className="demo-loading"/>}
                </List>
            </InfiniteScroll>
        </div>;
    }
}