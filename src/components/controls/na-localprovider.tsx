import * as React from 'react'
import {Component} from 'react'
import {LocaleProvider} from 'antd';

export interface ModalLocale {
    okText: string;
    cancelText: string;
    justOkText: string;
}

export interface NaLocalProviderProps {
    locale: {
        Pagination?: Object;
        DatePicker?: Object;
        TimePicker?: Object;
        Calendar?: Object;
        Table?: Object;
        Modal?: ModalLocale;
        Popconfirm?: Object;
        Transfer?: Object;
        Select?: Object;
    };
    children?: React.ReactElement<any>;
}
export interface NaLocalProviderStates {}
export class NaLocalProvider extends Component<NaLocalProviderProps,NaLocalProviderStates> {
    render() {
        return <LocaleProvider {...this.props}></LocaleProvider>
    }
}
