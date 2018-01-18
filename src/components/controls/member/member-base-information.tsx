import * as React from 'react';
import {Row, Col} from 'antd';
import {MememberAPI}from "../../../api/member";
import {GetUserContextResponse} from '../../../api/model/response/member';

interface MemberBaseInformationProps {

}

interface MemberBaseInformationStates {
    /** 会员的Code*/
    MemeberCode:string;
}

export class MemberBaseInformation extends React.Component<MemberBaseInformationProps, MemberBaseInformationStates> {
    constructor(props, context) {
        super(props, context);
        this.state={
            MemeberCode:""
        }
    }

    componentDidMount() {
        const topThis=this;
        MememberAPI.GetUserContextInfo().then((result: GetUserContextResponse) => {
            if(result.Status===0){
                topThis.setState({MemeberCode:result.Data.userInfo.MemeberCode});
            }
        });
    }

    render() {
        const topThis=this;
        const {state:{MemeberCode}}=topThis;
        return <Row>
            <p>
                <i className="iconfont icon-shoujianchenggong" title="收件人"></i>
                <span>大陆仓库</span>
            </p>
            <p>
                <i className="iconfont icon-dizhi2" title="地址"></i>
                <span>上海市黄浦区河南南路和蓬莱路交叉口24号楼402房间</span>
                <span style={{fontWeight:'bold',fontSize:18}}>{`( ${MemeberCode})`}</span>
            </p>
            <p>
                <i className="iconfont icon-youxiang2" title="邮编"></i>
                <span>4761111</span>
            </p>
            <p>
                <i className="iconfont icon-dianhua1" title="电话"></i>
                <span>0376-588 7777 777</span>
            </p>
        </Row>;
    }
}