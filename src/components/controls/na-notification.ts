import {notification} from 'antd';
export declare type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export interface ArgsProps {
    message: React.ReactNode;
    description: React.ReactNode;
    btn?: React.ReactNode;
    key?: string;
    onClose?: () => void;
    duration?: number;
    icon?: React.ReactNode;
    placement?: NotificationPlacement;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    readonly type?: string;
}
export interface ConfigProps {
    top?: number;
    bottom?: number;
    duration?: number;
    placement?: NotificationPlacement;
    getContainer?: () => HTMLElement;
}

export class NaNotification {
    static info(args : ArgsProps) : void {
        return notification.info(args);
    };
    static success(args : ArgsProps) : void {
        return notification.success(args);
    };
    static error(args : ArgsProps) : void {
        return notification.error(args);
    };
    static warn(args : ArgsProps) : void {
        return notification.warn(args);
    };
    static warning(args : ArgsProps) : void {
        return notification.warning(args);
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
