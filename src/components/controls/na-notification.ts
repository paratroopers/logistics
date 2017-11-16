import {notification} from 'antd';
export declare type notificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ArgsProps {
    message: React.ReactNode;
    description: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
    placement?: notificationPlacement;
    style?: string;
    prefixCls?: string;
    className?: string;
    readonly type?: string;
}
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    placement?: notificationPlacement;
    getContainer?: () => HTMLElement;
}

export class NaNotification {
    static info(args : ArgsProps) : void {
        return notification.info(args as ArgsProps);
    };
    static success(args : ArgsProps) : void {
        return notification.success(args as ArgsProps);
    };
    static error(args : ArgsProps) : void {
        return notification.error(args as ArgsProps);
    };
    static warn(args : ArgsProps) : void {
        return notification.warn(args as ArgsProps);
    };
    static warning(args : ArgsProps) : void {
        return notification.warning(args as ArgsProps);
    };
    static open(args : ArgsProps) : void {
        return notification.open(args)
    };
    static close(key : string) : void {
        return notification.close(key);
    };
    static config(options : ConfigProps) : void {
        return notification.config(options)
    };
    static destroy() : void {
        notification.destroy();
    };
}
