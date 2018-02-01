import * as React from 'react';
import {ModelNameSpace} from '../model/model';



interface FormTableProps {
    /*阶段*/
    step: ModelNameSpace.orderMergeStepEnum;
}

interface FormTableStates {

}

export class FormTable extends React.Component<FormTableProps, FormTableStates> {
    defaultConfig: any;
    constructor(props, context) {
        super(props, context);
    }
}