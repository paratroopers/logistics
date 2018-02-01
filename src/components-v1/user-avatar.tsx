import * as React from 'react';
import {Avatar} from 'antd';

interface UserAvatarProps {
    value?: string;
    attr?: 'Photo' | 'Name';
    size?: number;
    className?: string;
}

interface UserAvatarStates {
    size?: string;
}

export class UserAvatar extends React.Component<UserAvatarProps, UserAvatarStates> {

    renderText() {

    }

    render() {
        var size = this.props.size;
        var src = "http://www.famliytree.cn/icon/timor.png";

        const style = size ? {width: size, height: size, borderRadius: size} : {};
        return <Avatar className={this.props.className} style={style}
                       src={src}/>;
    }
}