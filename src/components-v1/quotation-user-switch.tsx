import * as React from 'react';
import {Row, Col, Switch, Checkbox} from 'antd';

interface QuotationUserSwitchProps {
    checked?: boolean;
    placeholder?: string;
    type?: 'checkBox' | 'switch';
    size?: 'small' | 'default';
    onChange?: (checked: any) => void;
}

interface QuotationUserSwitchStates {
    checked?: boolean;
}

export class QuotationUserSwitch extends React.Component<QuotationUserSwitchProps, QuotationUserSwitchStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: props ? props.checked : false
        }
    }

    componentWillReceiveProps(nextProps) {
        if ('checked' in nextProps && nextProps.isisAccurate !== this.props.checked) {
            this.setState({checked: nextProps.checked});
        }
    }

    render() {
        const {placeholder, size, onChange, type} = this.props;
        return <Row type="flex" justify="center" align="top">
            <Col span={24}>
                {type === 'switch' ?
                    <Switch size={size} checkedChildren="显示" unCheckedChildren="隐藏"
                            onChange={checked => {
                                onChange && onChange(checked);
                            }}></Switch> :
                    <Checkbox onChange={e => {
                        onChange && onChange(e.target.checked);
                    }}>{placeholder}</Checkbox>
                }
            </Col>
        </Row>;
    }
}
