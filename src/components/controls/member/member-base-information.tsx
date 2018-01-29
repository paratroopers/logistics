import * as React from 'react';
import {Row, Col, Tooltip, Button, message} from 'antd';
import {Context} from '../../../util/common';
// import {MemberAPI} from "../../../api/member";
import {APINameSpace} from '../../../model/api';
// import {GetUserContextResponse} from '../../../api/model/response/member';
import {ResponseNameSpace} from '../../../model/response';

import * as copy from 'copy-to-clipboard';

interface MemberBaseInformationProps {
    size?: number;
}

interface MemberBaseInformationStates {
    /** 会员的Code*/
    MemeberCode: string;
}

export class MemberBaseInformation extends React.Component<MemberBaseInformationProps, MemberBaseInformationStates> {
    constructor(props, context) {
        super(props, context);
        this.state = {
            MemeberCode: ""
        }
    }

    componentDidMount() {
        this.setState({MemeberCode: Context.getCurrentUser().userInfo.MemeberCode});
    }

    renderCopy() {
        const topThis = this;
        const {state: {MemeberCode}} = topThis;
        return <span style={{cursor: "pointer"}} onClick={() => {
            const copyText = "上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间" + MemeberCode;
            copy(copyText);
            message.success("复制成功!");
        }}>复制</span>;
    }

    render() {
        const topThis = this;
        const {state: {MemeberCode}, props: {size}} = topThis;
        const style = size ? {fontSize: size + 'px', lineHeight: size + 'px'} : {};
        return <Row className="member-information">
            <p style={{cursor: "pointer"}}>
                <i style={style} className="iconfont icon-shoujianchenggong" title="收件人"></i>
                <div className="self-warehouse">大陆仓库</div>
            </p>
            <p style={{cursor: "pointer"}}>
                <i style={style} className="iconfont icon-dizhi2" title="地址"></i>
                <Tooltip title={topThis.renderCopy()} trigger="hover" placement="topRight">
                    <div className="self-warehouse">上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间{`( ${MemeberCode})`}</div>
                </Tooltip>
            </p>
            <p style={{cursor: "pointer"}}>
                <i style={style} className="iconfont icon-youxiang2" title="邮编"></i>
                <div className="self-warehouse">4761111</div>
            </p>
            <p style={{cursor: "pointer"}}>
                <i style={style} className="iconfont icon-dianhua1" title="电话"></i>
                <div className="self-warehouse">0376-588 7777 777</div>
            </p>
        </Row>;
    }
}