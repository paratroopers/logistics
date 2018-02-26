import * as React from 'react';
import {Button} from 'antd';
import {APINameSpace} from '../model/api';

export interface FormExportProps {
    disabled?: boolean;
}

export interface FormExportStates {
}

export class FormExport extends React.Component<FormExportProps, FormExportStates> {

    onClick() {
        (document.getElementById("fileExportForm") as any).submit();
    }

    render() {
        const {props: {disabled}} = this;

        return <div>
            <Button type="primary" disabled={false} icon="download"
                    onClick={this.onClick.bind(this)}>{"导出"}</Button>
            <form style={{display: 'none'}} id="fileExportForm" method="post"
                  action={APINameSpace.CommonAPI.baseURL + "CustomerOrder/Export"}
                  target="fileExport">
            </form>
            <iframe name="fileExport" style={{display: 'none'}}></iframe>
        </div>;
    }
}