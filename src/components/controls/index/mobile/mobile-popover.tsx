import * as React from 'react';
import {hashHistory} from 'react-router';
import {Popover, Icon, Modal} from 'antd-mobile';
import {Context} from '../../../../util/common';
import {Cookies} from '../../../../util/cookie';
import {PathConfig} from '../../../../config/pathconfig';
import {MobileNavTreeAction} from '../../../../actions/index';

interface MobilePopoverProps {
    visible?: boolean;
    className?: string;
}

interface MobilePopoverStates {
    visible?: boolean;
    selected?: string;
}

export class MobilePopover extends React.Component<MobilePopoverProps, MobilePopoverStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            visible: false
        }
    }

    onVisibleChange(visible) {
        this.setState({visible: visible});
    };

    onSelect(node, index) {
        if (index === 0) {
            Modal.alert('退出', '确定退出?', [
                {
                    text: '取消', onPress: () => {
                }, style: 'default'
                },
                {
                    text: '确定', onPress: () => {
                    Cookies.remove("Authorization");
                    hashHistory.push(PathConfig.LoginPage);
                }
                },
            ])
        }
    }

    renderOverlay() {
        const style = {fontSize: '25px', lineHeight: '22px'};
        const textStyle = {width: '60px', display: 'inline-block'};
        return [
            <Popover.Item key="4"
                          icon={<i style={style}
                                   className={Context.getIconClassName('icon-tuichu')}></i>}><span
                style={textStyle}>退出</span>
            </Popover.Item>,
            <Popover.Item key="5"
                          icon={<i style={style}
                                   className={Context.getIconClassName('icon-tuichu')}></i>}><span
                style={textStyle}>修改密码</span>
            </Popover.Item>
        ]
    }

    render() {
        return <Popover mask
                        overlayStyle={{color: 'currentColor'}}
                        visible={this.state.visible}
                        overlay={this.renderOverlay()}
                        onVisibleChange={this.onVisibleChange.bind(this)}
                        onSelect={this.onSelect.bind(this)}>
            <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
            }}>
                <Icon type="ellipsis"/>
            </div>
        </Popover>
    }
}