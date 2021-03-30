export class HomeNews {
  constructor(
    public id?: number,
    public title?: string,
    public shortenCode?: string,
    public thumbnailUrl?: string,
    public quote?: string,
    public createdDate?: Date
  ) {}
}

export class HomePartner {
  constructor(
    public id?: number,
    public name?: string,
    public imageUrl?: string,
    public ratePoint?: number,
    public rateUser?: string,
    public rateComment?: string
  ) {}
}

export interface IHomeData {
  partnerDataList?: Array<HomePartner>;
  newsDataList?: Array<HomeNews>;
}

export class HomeData implements IHomeData {
  constructor(public partnerDataList?: Array<HomePartner>, public newsDataList?: Array<HomeNews>) {}
}
