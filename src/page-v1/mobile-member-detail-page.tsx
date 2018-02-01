import * as React from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux'
import {Grid, Carousel} from 'antd-mobile';
import {Global} from '../util/common';


interface MemberDetailPageProps {
    data?: any;
}

interface MemberDetailPageStates {
}

@withRouter
class MemberDetailPage extends React.Component<MemberDetailPageProps, MemberDetailPageStates> {

    renderGridItem() {
        return this.props.data.map(item => {
            return {
                icon: <i style={{fontSize: item.FontSize, lineHeight: '22px', color: item.Color}}
                         className={'iconfont ' + item.Icon}></i>,
                text: Global.intl.formatMessage({id: item.Title})
            };
        });
    }

    render() {
        return <div>
            <Carousel
                autoplay={false}
                infinite
                selectedIndex={1}
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}>
                {['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'].map(ii => (
                    <a key={ii}
                       href="http://www.alipay.com"
                       style={{display: 'inline-block', width: '100%', height: 120}}>
                        <img
                            src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
                            alt=""
                            style={{width: '100%', verticalAlign: 'top'}}
                            onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({imgHeight: 'auto'});
                            }}
                        />
                    </a>
                ))}
            </Carousel>
            <Grid itemStyle={{height: '70px'}}
                  columnNum={3}
                  carouselMaxRow={1}
                  data={this.renderGridItem()}
                  isCarousel/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.nav.data
    }
}
export default connect(mapStateToProps)(MemberDetailPage);