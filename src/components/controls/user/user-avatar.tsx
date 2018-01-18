import * as React from 'react';
import {Avatar} from 'antd';
import {enumAvatarType} from '../common/common';

interface UserAvatarProps {
    value?: string;
    attr?: 'Photo' | 'Name';
    size?: number;
    className?: string;
    type:enumAvatarType;
}
interface UserAvatarStates {
    size?: string;
}

export class UserAvatar extends React.Component<UserAvatarProps, UserAvatarStates> {

    renderText() {

    }

    render() {
         var size = this.props.size;
         var type = this.props.type;
         var src;

         if(type == enumAvatarType.user){
             src ="http://www.famliytree.cn/icon/timor.png";
         }
         else if (type ==enumAvatarType.message){
             src ="http://www.famliytree.cn/icon/message.png";
         }

        const style = size ? {width: size, height: size, borderRadius: size} : {};
        return <Avatar className={this.props.className} style={style}
                       src={src}/>;
    }
}