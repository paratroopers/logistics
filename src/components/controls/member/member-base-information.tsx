import * as React from 'react';
import {Row, Col, Tooltip , Button,message} from 'antd';
import {MememberAPI} from "../../../api/member";
import {GetUserContextResponse} from '../../../api/model/response/member';
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
        const topThis = this;
        MememberAPI.GetUserContextInfo().then((result: GetUserContextResponse) => {
            if (result.Status === 0) {
                topThis.setState({MemeberCode: result.Data.userInfo.MemeberCode});
            }
        });
    }

    renderCopy() {
        const topThis = this;
        const {state: {MemeberCode}} = topThis;
        return <span style={{cursor:"pointer"}} onClick={() => {
            const copyText="上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间" + MemeberCode;
            copy(copyText);
            message.success("复制成功!");
        }}>复制</span>;
    }

    render() {
        const topThis = this;
        const {state: {MemeberCode}, props: {size}} = topThis;
        const style = size ? {fontSize: size + 'px', lineHeight: size + 'px'} : {};
        return <Row>
            <p>
                <i style={style} className="iconfont icon-shoujianchenggong" title="收件人"></i>
                <span>大陆仓库</span>
            </p>
            <p style={{cursor:"pointer"}}>
                <Tooltip  title={topThis.renderCopy()} trigger="hover" placement="topRight">
                    <i style={style} className="iconfont icon-dizhi2" title="地址"></i>
                    <span>上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间</span>
                    <span>{`( ${MemeberCode})`}</span>
                </Tooltip >
            </p>
            <p>
                <i style={style} className="iconfont icon-youxiang2" title="邮编"></i>
                <span>4761111</span>
            </p>
            <p>
                <i style={style} className="iconfont icon-dianhua1" title="电话"></i>
                <span>0376-588 7777 777</span>
            </p>
        </Row>;
    }
}