import {NaRequest, NaResponse} from "../util/common";
import {Request} from '../util/request';
import {CountryRequest} from './model/request/quotation-request';

const BasicsUrl = "http://www.famliytree.cn/_api/ver(1.0)/";

export class QuotationApi {
    static async GetCountry(data: CountryRequest) {
        let url: string = BasicsUrl + "Quotation/Country/Items";
        return new Request<NaRequest, NaResponse>().get(url, (data.request.name ? {"request.name": data.request.name} : {}));
    }

    static async GetQuotation(data: any) {
        let url: string = BasicsUrl + "Quotation/Item";
        return new Request<NaRequest, NaResponse>().get(url, data);
    }
}