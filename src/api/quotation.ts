import {NaRequest, NaResponse} from "../util/common";
import {Request} from '../util/request';
import {CountryRequest, QuotationRequest} from './model/request/quotation-request';
import  {QuotationResponse} from './model/response/quotation'
import {url} from "inspector";

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

    //enzo 写的demo;请求和相应都要定义对象；
    static  GetQuotationByEnzo(reqeust:QuotationRequest):Promise<QuotationResponse>{
        let url: string = BasicsUrl + "Quotation/Country/Items";
        return new Request<QuotationRequest, QuotationResponse>().get(url,reqeust);
    }
}