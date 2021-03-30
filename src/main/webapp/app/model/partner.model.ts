export interface IPartner {
  id?: number;
  name?: string;
  imageUrl?: string;
  ratePoint?: number;
  rateUser?: string;
  rateComment?: string;
}

export class Partner implements IPartner {
  constructor(
    public id?: number,
    public name?: string,
    public imageUrl?: string,
    public ratePoint?: number,
    public rateUser?: string,
    public rateComment?: string
  ) {}
}
