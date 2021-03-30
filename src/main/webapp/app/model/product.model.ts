export enum ProductType {
  BIOMASS = 'BIOMASS',
  LO_HOI = 'LO_HOI',
  GIAI_PHAP = 'GIAI_PHAP'
}

export interface IProduct {
  id?: number;
  name?: string;
  shortenCode?: string;
  imageUrl?: string;
  quote?: string;
  seoTitle?: string;
  seoPath?: string;
  seoDescription?: string;
  seoKeyword?: string;
  description?: any;
  productType?: ProductType;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public shortenCode?: string,
    public imageUrl?: string,
    public quote?: string,
    public seoTitle?: string,
    public seoPath?: string,
    public seoDescription?: string,
    public seoKeyword?: string,
    public description?: any,
    public productType?: ProductType
  ) {}
}
