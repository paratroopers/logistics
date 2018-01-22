import * as React from 'react';
import {orderMergeStepEnum} from '../../api/model/base';


interface FormTableProps {
    /*阶段*/
    step: orderMergeStepEnum;
}

interface FormTableStates {

}

export class FormTable extends React.Component<FormTableProps, FormTableStates> {
    defaultConfig: any;

    constructor(props, context) {
        super(props, context);
    }
}