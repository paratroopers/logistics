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
        const {props: {size, className}} = this;
        const style = size ? {width: size, height: size, borderRadius: size} : {};
        return <Avatar className={className} style={style}
                       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>;
    }
}