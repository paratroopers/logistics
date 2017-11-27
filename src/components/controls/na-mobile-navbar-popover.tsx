import * as React from 'react';
import {Popover, Icon, Menu} from 'antd-mobile';

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs"
                          alt=""/>;

interface NaMobileNavbarPopoverProps {
    visible?: boolean;
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

    componentDidMount() {
        this.setState({visible: this.props.visible});
    }

    componentWillReceiveProps(nextProps) {
        if ('visible' in nextProps && nextProps.visible !== this.props.visible) {
            this.setState({visible: this.props.visible});
        }
    }

    onSelect(opt) {
        this.setState({
            visible: false,
            selected: opt.props.value,
        });
    };

    renderMenu() {
        const data = [{
            label: 'Chinese Food',
            value: '2',
        }];
        return <Menu
            className="foo-menu"
            data={data}
            height={document.documentElement.clientHeight * 0.6}
        />;
    }

    renderOverlay() {
        return [
            (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')}
                   data-seed="logId">Scan</Item>),
            (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')}
                   style={{whiteSpace: 'nowrap'}}>My Qrcode</Item>),
            (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                <span style={{marginRight: 5}}>Language</span>
            </Item>),
        ];
    }

    render() {
        return <Popover overlayStyle={{color: 'currentColor'}}
                        visible={this.state.visible}
                        overlay={this.renderOverlay()}
                        onSelect={this.onSelect}
                        mask={true}>
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