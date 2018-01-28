export class DefaultoOenKeys {
    // static  uatURL = "http://localhost:8090/_api/ver(1.0)/";
    //  static  baseURL = "http://www.famliytree.cn/_api/ver(1.0)/";
    static MyOrder = "890331594632818690";
    static UserInformation = "892231594632818690";
}

export class PageContext {
    static ConvertUrlArray(array: string[], param: string) {
        let convertData: any = {};
        array.forEach(t => {
            let data: any = {};
            data[param] = t;
        })
        return convertData;
    }
}