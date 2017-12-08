import * as React from 'react';
import {Icon} from 'antd';
import {NaGlobal} from '../../util/common';
import {MobileNavTreeAction} from '../../actions/index';

interface NaMobileNavbarPopoverProps {
    visible?: boolean;
    className?: string;
}

interface NaMobileNavbarPopoverStates {
    showNav?: boolean;
    selected?: string;
}

export class NaMobileNavbarPopover extends React.Component<NaMobileNavbarPopoverProps, NaMobileNavbarPopoverStates> {
    constructor(props, context) {
        super(props, context)
        this.state = {
            showNav: false
        }
    }

    onSelect() {
        this.setState({showNav: !this.state.showNav});
        NaGlobal.store.dispatch(MobileNavTreeAction.SelectTabLoaded(!this.state.showNav));
    };

    render() {
        return <a className={this.props.className} onClick={this.onSelect.bind(this)}><Icon type="bars"/></a>
    }
}