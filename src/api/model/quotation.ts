export interface CountryModel {
    ID?: string;
    chineseName?: string;
    code?: string;
    englishName?: string;
}

export interface CostModal {
    country?: string;
    weight?: string;
    length?: string;
    width?: string;
    height?: string;
    volume?: string;
    searchName?: string;
}

export interface CostTableModal {
    Amount?: number;
    Clause?: string;
    Prescription?: string;
    Remark?: string;
    ServiceAmount?: number;
    channelID?: string;
    channelName?: string;
    weight?: number;
}