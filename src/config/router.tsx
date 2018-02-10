import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import {PathConfig, MobilePathConfig} from './pathconfig';
import {DemoPage} from "../page-v1/demo";
import {NaMasterMainPage} from "../page-v1/master-main-page";
import {MemberWelcomePage} from "../page-v1/member-welcome-page";
import {MemberAddressPage} from "../page-v1/member-address-page";
import {MemberAddressPageAdd} from "../page-v1/member-address-page-add";
import {MemberAddressPageEdit} from "../page-v1/member-address-page-edit";
import {MemberAddressPageView} from "../page-v1/member-address-page-view";
import MemberDeliveredPage from "../page-v1/member-delivered-page";
import {MemberMessageListPage} from "../page-v1/member-message-list-page";
import {MemberMyOrderPage} from "../page-v1/member-my-order-page";
import {MemberUserInformationPage} from "../page-v1/member-user-information";
import MemberWaitPayPage from "../page-v1/member-wait-pay-page";
import {MemberWarehouseInQueryPage} from "../page-v1/member-warehouse-in-query-page";
import {WarehouseInPage} from "../page-v1/warehouse-in-page";
import {WarehouseInAddPage} from "../page-v1/warehouse-in-add-page";
import {WarehouseInViewPage} from "../page-v1/warehouse-in-view-page";
import {WarehouseInEditPage} from "../page-v1/warehouse-in-edit-page";
import {MemberMergePackage} from "../page-v1/member-merge-package";
import {MemberPaymentPage} from '../page-v1/member-payment-page';

import UserLoginPage from '../page-v1/user-login-page';
import UserRegisterPage from '../page-v1/user-register-page';
import {IndexCompanyPage} from "../page-v1/index-company-page";
import {IndexCostPage} from "../page-v1/index-cost-page";
import {IndexHomePage} from "../page-v1/index-home-page";
import MemberPage from "../page-v1/member-page";

import {MobileMemberPage} from "../page-v1/mobile-member-page";
import MobileMemberDetailPage from "../page-v1/mobile-member-detail-page";
import {MobileMemberWelcomePage} from "../page-v1/mobile-member-welcome-page";
import {MobileCustomerServicePage} from "../page-v1/mobile-customer-service-page";

import CustomerServiceConfirmListPage from "../page-v1/customer-service-confirm-list-page";
import WarehouseOutPage from '../page-v1/warehouse-out-page';
import WarehousePackgePage from '../page-v1/warehouse-packge-page';


const routerConfig = (
    <Router history={hashHistory}>
        {/*<Route path={PathConfig.EnzoDemoPage} component={FormControl.EnzoDemoPage}/>*/}
        <Route path={PathConfig.DemoPage} component={DemoPage}/>
        <Route path={PathConfig.MasterPage} component={NaMasterMainPage}>
            <IndexRoute component={IndexHomePage}></IndexRoute>
            <Route path={PathConfig.HomePage} component={IndexHomePage}/>
            <Route path={PathConfig.CostEstimatePage} component={IndexCostPage}/>
            <Route path={PathConfig.CompanyProfilePage} component={IndexCompanyPage}/>
            {/*<Route path={PathConfig.MobilePage} component={NaMobileTabBar}/>*/}
            <Route path={MobilePathConfig.UserCenter} component={MobileMemberPage}/>
            <Route path={MobilePathConfig.UserCenterDetail} component={MobileMemberDetailPage}/>
            <Route path={MobilePathConfig.UserHelper} component={MobileCustomerServicePage}/>
            <Route path={MobilePathConfig.UserHome} component={MobileMemberWelcomePage}/>
            <Route path={PathConfig.MemberIndexPage} component={MemberPage}>
                <IndexRoute component={MemberWelcomePage}></IndexRoute>
                <Route path={PathConfig.MemberIndexPage} component={MemberWelcomePage}/>
                <Route path={PathConfig.MemberAddressPage} component={MemberAddressPage}/>
                <Route path={PathConfig.MemberAddressPageAdd} component={MemberAddressPageAdd}/>
                <Route path={PathConfig.MemberAddressPageEdit} component={MemberAddressPageEdit}/>
                <Route path={PathConfig.MemberAddressPageView} component={MemberAddressPageView}/>
                <Route path={PathConfig.MemberDeliveredPage} component={MemberDeliveredPage}/>
                <Route path={PathConfig.MemberMessageListPage} component={MemberMessageListPage}/>
                <Route path={PathConfig.MemberMyOrderPage} component={MemberMyOrderPage}/>
                <Route path={PathConfig.MemberUserInformationPage} component={MemberUserInformationPage}/>
                <Route path={PathConfig.MemberWaitPayPage} component={MemberWaitPayPage}/>
                <Route path={PathConfig.MemberWarehouseInQueryPage} component={MemberWarehouseInQueryPage}/>
                <Route path={PathConfig.WarehouseInPage} component={WarehouseInPage}/>
                <Route path={PathConfig.WarehouseOutPage} component={WarehouseOutPage}/>
                <Route path={PathConfig.WarehousePackage} component={WarehousePackgePage}/>
                <Route path={PathConfig.WarehouseInAddPage} component={WarehouseInAddPage}/>
                <Route path={PathConfig.WarehouseInViewPage} component={WarehouseInViewPage}/>
                <Route path={PathConfig.WarehouseInEditPage} component={WarehouseInEditPage}/>
                <Route path={PathConfig.MemberMergePackage} component={MemberMergePackage}/>
                <Route path={PathConfig.MemberPaymentPage} component={MemberPaymentPage}/>
                <Route path={PathConfig.CustomerServicePage} component={CustomerServiceConfirmListPage}/>
            </Route>
        </Route>
        <Route path={PathConfig.LoginPage} component={UserLoginPage}/>
        <Route path={PathConfig.RegisterPage} component={UserRegisterPage}/>
    </Router>
);
export default routerConfig;


