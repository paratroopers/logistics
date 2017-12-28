import * as React from 'react';
import {hashHistory} from 'react-router';
import {Popover, Icon, Modal} from 'antd-mobile';
import {NaContext} from '../../util/common';
import {Cookies} from '../../util/cookie';
import {PathConfig} from '../../config/pathconfig';
import {MobileNavTreeAction} from '../../actions/index';

interface NaMobileNavbarPopoverProps {
    visible?: boolean;
    className?: string;
}

interface NaMobileNavbarPopoverStates {
    visible?: boolean;
    selected?: string;
}

export class NaMobileNavbarPopover extends React.Component<NaMobileNavbarPopoverProps, NaMobileNavbarPopoverStates> {
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

    render() {
        return <Popover mask
                        overlayStyle={{color: 'currentColor'}}
                        visible={this.state.visible}
                        overlay={[
                            (<Popover.Item key="4" value="scan"
                                           icon={<i style={{fontSize: '25px', lineHeight: '22px'}}
                                                    className={NaContext.getIconClassName('icon-tuichu')}></i>}
                                           data-seed="logId"><span
                                style={{
                                    width: '30px',
                                    display: 'inline-block'
                                }}>退出</span></Popover.Item>)
                        ]}
                        onVisibleChange={this.onVisibleChange.bind(this)}
                        onSelect={this.onSelect.bind(this)}>
            <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
            }}
            >
                <Icon type="ellipsis"/>
            </div>
        </Popover>
    }
}