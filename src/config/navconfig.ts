import {NavLocale} from '../locales/localeid';
import {NaGlobal} from '../util/common';

const NavTree = [
    {
        Title: NavLocale.MyWarehouse,
        Key: NavLocale.MyWarehouse,
        Icon: 'shopping-cart',
        Children: [{
            Title: NavLocale.Order,
            Key: NavLocale.Order,
            Icon: ''
        }, {
            Title: NavLocale.OrdersAlreadyIssued,
            Key: NavLocale.OrdersAlreadyIssued,
            Icon: ''
        }, {
            Title: NavLocale.OrderToBarnOriginalOrder,
            Key: NavLocale.OrderToBarnOriginalOrder,
            Icon: ''
        }, {
            Title: NavLocale.HistoricalOrder,
            Key: NavLocale.HistoricalOrder,
            Icon: ''
        }]
    }, {
        Title: NavLocale.MySettings,
        Key: NavLocale.MySettings,
        Icon: 'setting',
        Children: [{
            Title: NavLocale.PersonalInformation,
            Key: NavLocale.PersonalInformation,
            Icon: ''
        }, {
            Title: NavLocale.ModifyThePassword,
            Key: NavLocale.ModifyThePassword,
            Icon: ''
        }, {
            Title: NavLocale.MyPoints,
            Key: NavLocale.MyPoints,
            Icon: ''
        }]
    }, {
        Title: NavLocale.CustomerManagement,
        Key: NavLocale.CustomerManagement,
        Icon: 'team',
        Children: [{
            Title: NavLocale.AcknowledgementOfOrder,
            Key: NavLocale.AcknowledgementOfOrder,
            Icon: ''
        }, {
            Title: NavLocale.CustomerReturns,
            Key: NavLocale.CustomerReturns,
            Icon: ''
        }, {
            Title: NavLocale.AgentReturn,
            Key: NavLocale.AgentReturn,
            Icon: ''
        }]
    }, {
        Title: NavLocale.QuotationManagement,
        Key: NavLocale.QuotationManagement,
        Icon: 'notification',
        Children: [{
            Title: NavLocale.ExpressChanne,
            Key: NavLocale.ExpressChanne,
            Icon: ''
        }]
    }, {
        Title: NavLocale.Finance,
        Key: NavLocale.Finance,
        Icon: 'calculator',
        Children: [{
            Title: NavLocale.CustomerSettlement,
            Key: NavLocale.CustomerSettlement,
            Icon: '',
            Children: [{
                Title: NavLocale.CustomerReturnCheck,
                Key: NavLocale.CustomerReturnCheck,
                Icon: ''
            }, {
                Title: NavLocale.BillReceivable,
                Key: NavLocale.BillReceivable,
                Icon: ''
            }, {
                Title: NavLocale.ReceivablesManagement,
                Key: NavLocale.ReceivablesManagement,
                Icon: ''
            }]
        }, {
            Title: NavLocale.AgencySettlement,
            Key: NavLocale.AgencySettlement,
            Icon: '',
            Children: [{
                Title: NavLocale.AgencyReturnCheck,
                Key: NavLocale.AgencyReturnCheck,
                Icon: ''
            }, {
                Title: NavLocale.NotesPayable,
                Key: NavLocale.NotesPayable,
                Icon: ''
            }, {
                Title: NavLocale.PaymentManagement,
                Key: NavLocale.PaymentManagement,
                Icon: ''
            }]
        }]
    }, {
        Title: NavLocale.ReportForm,
        Key: NavLocale.ReportForm,
        Icon: 'copy',
        Children: [{
            Title: NavLocale.BusinessStatistics,
            Key: NavLocale.BusinessStatistics,
            Icon: '',
            Children: [{
                Title: NavLocale.WarehousingStatistics,
                Key: NavLocale.WarehousingStatistics,
                Icon: ''
            }, {
                Title: NavLocale.OutOfWarehouseStatistics,
                Key: NavLocale.OutOfWarehouseStatistics,
                Icon: ''
            }, {
                Title: NavLocale.CustomerRefundStatistics,
                Key: NavLocale.CustomerRefundStatistics,
                Icon: ''
            }, {
                Title: NavLocale.StatisticsOfProxyWithdrawal,
                Key: NavLocale.StatisticsOfProxyWithdrawal,
                Icon: ''
            }]
        }, {
            Title: NavLocale.FinancialStatements,
            Key: NavLocale.FinancialStatements,
            Icon: '',
            Children: [{
                Title: NavLocale.WaterAccount,
                Key: NavLocale.WaterAccount,
                Icon: ''
            }, {
                Title: NavLocale.CollectionSummary,
                Key: NavLocale.CollectionSummary,
                Icon: ''
            }, {
                Title: NavLocale.PaymentSummary,
                Key: NavLocale.PaymentSummary,
                Icon: ''
            }]
        }, {
            Title: NavLocale.ComprehensiveAnalysis,
            Key: NavLocale.ComprehensiveAnalysis,
            Icon: '',
            Children: [{
                Title: NavLocale.NetProfitStatistics,
                Key: NavLocale.NetProfitStatistics,
                Icon: ''
            }]
        }]
    }, {
        Title: NavLocale.Warehouse,
        Key: NavLocale.Warehouse,
        Icon: 'home',
        Children: [{
            Title: NavLocale.Storage,
            Key: NavLocale.Storage,
            Icon: ''
        }, {
            Title: NavLocale.Pack,
            Key: NavLocale.Pack,
            Icon: ''
        }, {
            Title: NavLocale.TheLibrary,
            Key: NavLocale.TheLibrary,
            Icon: ''
        }, {
            Title: NavLocale.AgentReturn,
            Key: NavLocale.AgentReturn,
            Icon: ''
        }, {
            Title: NavLocale.CustomerReturns,
            Key: NavLocale.CustomerReturns,
            Icon: ''
        }]
    }, {
        Title: NavLocale.MetadataSetting,
        Key: NavLocale.MetadataSetting,
        Icon: 'appstore-o',
        Children: [
            {
                Title: NavLocale.Member,
                Key: NavLocale.Member,
                Icon: ''
            }, {
                Title: NavLocale.Warehouse,
                Key: NavLocale.Warehouse,
                Icon: ''
            }, {
                Title: NavLocale.Finance,
                Key: NavLocale.Finance,
                Icon: ''
            }, {
                Title: NavLocale.Customer,
                Key: NavLocale.Customer,
                Icon: ''
            }
        ]
    }, {
        Title: NavLocale.SystemSetup,
        Key: NavLocale.SystemSetup,
        Icon: 'tool',
        Children: [{
            Title: NavLocale.Jurisdiction,
            Key: NavLocale.Jurisdiction,
            Icon: '',
            Children: [{
                Title: NavLocale.User,
                Key: NavLocale.User,
                Icon: ''
            }, {
                Title: NavLocale.Navigation,
                Key: NavLocale.Navigation,
                Icon: ''
            }, {
                Title: NavLocale.Role,
                Key: NavLocale.Role,
                Icon: ''
            }]
        }]
    }
];
export default NavTree;