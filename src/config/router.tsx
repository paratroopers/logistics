import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig, MobilePathConfig} from './pathconfig';
import {
    DemoPage,
    UserLoginPage,
    NaMasterMainPage,
    HomePage,
    CostPage,
    CompanyPage,
    NaMobileTabBar,
    MemberPage,
    MemberConsigneePage,
    MemberWelcomePage,
    UserRegisterPage,
    WarehouseStoragePage
} from '../page';
import {
    MemberPage as MobileMemberPage,
    MemberDetailPage,
    CustomerServicePage,
    MemberWelcomePage as MobileMemberWelcomePage
} from '../page/mobile/index';


const routerConfig = (
    <Router history={hashHistory}>
        <Route path={PathConfig.DemoPage} component={DemoPage}/>
        <Route path={PathConfig.MasterPage} component={NaMasterMainPage}>
            <IndexRoute component={HomePage}></IndexRoute>
            <Route path={PathConfig.HomePage} component={HomePage}/>
            <Route path={PathConfig.CostEstimatePage} component={CostPage}/>
            <Route path={PathConfig.CompanyProfilePage} component={CompanyPage}/>
            <Route path={PathConfig.MobilePage} component={NaMobileTabBar}/>
            <Route path={MobilePathConfig.UserCenter} component={MobileMemberPage}/>
            <Route path={MobilePathConfig.UserCenterDetail} component={MemberDetailPage}/>
            <Route path={MobilePathConfig.UserHelper} component={CustomerServicePage}/>
            <Route path={MobilePathConfig.UserHome} component={MobileMemberWelcomePage}/>
            <Route path={PathConfig.VIPCenterPage} component={MemberPage}>
                <IndexRoute component={MemberWelcomePage}></IndexRoute>
                <Route path={PathConfig.VIPConsigneeAddressPage} component={MemberConsigneePage}/>
                <Route path={PathConfig.WarehouseStoragePage} component={WarehouseStoragePage}/>
            </Route>
        </Route>
        <Route path={PathConfig.LoginPage} component={UserLoginPage}/>
        <Route path={PathConfig.RegisterPage} component={UserRegisterPage}/>
    </Router>
);
export default routerConfig;


