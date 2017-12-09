import {NavLocale} from '../locales/localeid';

const MobileNavTree = [
    {
        Title: NavLocale.MyWarehouse,
        Key: NavLocale.MyWarehouse,
        Icon: '',
        Children: [{
            Title: NavLocale.Order,
            Key: NavLocale.Order,
            Icon: 'icon-dingdan',
            Color: '#1296db',
        }, {
            Title: NavLocale.OrdersAlreadyIssued,
            Key: NavLocale.OrdersAlreadyIssued,
            Icon: 'icon-yifahuodingdan',
            Color: '#e65922'
        }, {
            Title: NavLocale.OrderToBarnOriginalOrder,
            Key: NavLocale.OrderToBarnOriginalOrder,
            Icon: 'icon-dingdan2',
            Color: 'rgb(119, 181, 2)'
        }, {
            Title: NavLocale.HistoricalOrder,
            Key: NavLocale.HistoricalOrder,
            Icon: 'icon-dingdan1',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.MySettings,
        Key: NavLocale.MySettings,
        Icon: '',
        Children: [{
            Title: NavLocale.PersonalInformation,
            Key: NavLocale.PersonalInformation,
            Icon: 'icon-gerenxinxi',
            Color: '#1296db'
        }, {
            Title: NavLocale.ModifyThePassword,
            Key: NavLocale.ModifyThePassword,
            Icon: 'icon-xiugaimima',
            Color: '#a4cf53'
        }, {
            Title: NavLocale.MyPoints,
            Key: NavLocale.MyPoints,
            Icon: 'icon-wodejifen',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.CustomerManagement,
        Key: NavLocale.CustomerManagement,
        Icon: 'team',
        Children: [{
            Title: NavLocale.AcknowledgementOfOrder,
            Key: NavLocale.AcknowledgementOfOrder,
            Icon: 'icon-queren',
            Color: '#1296db'
        }, {
            Title: NavLocale.CustomerReturns,
            Key: NavLocale.CustomerReturns,
            Icon: 'icon-tuihuo1',
            Color: '#1296db'
        }, {
            Title: NavLocale.AgentReturn,
            Key: NavLocale.AgentReturn,
            Icon: 'icon-tuihuo2',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.QuotationManagement,
        Key: NavLocale.QuotationManagement,
        Icon: 'notification',
        Children: [{
            Title: NavLocale.ExpressChanne,
            Key: NavLocale.ExpressChanne,
            Icon: 'icon-combinedshape',
            Color: 'rgb(119, 181, 2)'
        }]
    },
    {
        Title: NavLocale.Finance,
        Key: NavLocale.Finance,
        Icon: 'calculator',
        Children: [{
            Title: NavLocale.CustomerSettlement,
            Key: NavLocale.CustomerSettlement,
            Icon: 'icon-jiesuan1',
            Color: '#1296db'
        }, {
            Title: NavLocale.AgencySettlement,
            Key: NavLocale.AgencySettlement,
            Icon: 'icon-jiesuan',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.ReportForm,
        Key: NavLocale.ReportForm,
        Icon: 'copy',
        Children: [{
            Title: NavLocale.BusinessStatistics,
            Key: NavLocale.BusinessStatistics,
            Icon: 'icon-tongji',
            Color: '#1296db'
        }, {
            Title: NavLocale.FinancialStatements,
            Key: NavLocale.FinancialStatements,
            Icon: 'icon-baobiao',
            Color: '#1296db'
        }, {
            Title: NavLocale.ComprehensiveAnalysis,
            Key: NavLocale.ComprehensiveAnalysis,
            Icon: 'icon-fenxi',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.Warehouse,
        Key: NavLocale.Warehouse,
        Icon: 'home',
        Children: [{
            Title: NavLocale.Storage,
            Key: NavLocale.Storage,
            Icon: 'icon-ruku',
            Color: '#1296db'
        }, {
            Title: NavLocale.Pack,
            Key: NavLocale.Pack,
            Icon: 'icon-dabao',
            Color: '#1296db'
        }, {
            Title: NavLocale.TheLibrary,
            Key: NavLocale.TheLibrary,
            Icon: 'icon-chuku',
            Color: '#1296db'
        }, {
            Title: NavLocale.AgentReturn,
            Key: NavLocale.AgentReturn,
            Icon: 'icon-tuihuo2',
            Color: '#1296db'
        }, {
            Title: NavLocale.CustomerReturns,
            Key: NavLocale.CustomerReturns,
            Icon: 'icon-tuihuo1',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.MetadataSetting,
        Key: NavLocale.MetadataSetting,
        Icon: 'appstore-o',
        Children: [{
            Title: NavLocale.Member,
            Key: NavLocale.Member,
            Icon: 'icon-huiyuan2',
            Color: '#1296db'
        }, {
            Title: NavLocale.Warehouse,
            Key: NavLocale.Warehouse,
            Icon: 'icon-cangku',
            Color: '#1296db'
        }, {
            Title: NavLocale.Finance,
            Key: NavLocale.Finance,
            Icon: 'icon-caiwu',
            Color: '#1296db'
        }, {
            Title: NavLocale.Customer,
            Key: NavLocale.Customer,
            Icon: 'icon-kehu',
            Color: '#1296db'
        }]
    },
    {
        Title: NavLocale.SystemSetup,
        Key: NavLocale.SystemSetup,
        Icon: 'tool',
        Children: [{
            Title: NavLocale.Jurisdiction,
            Key: NavLocale.Jurisdiction,
            Icon: ''
        }]
    }
];

export default MobileNavTree;