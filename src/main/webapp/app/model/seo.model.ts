export interface ISeo {
  newsId?: number;
  newsTitle?: string;
  newsShortenCode?: string;
  newsThumbnailUrl?: string;
  newsQuote?: string;
  newsContent?: any;
  newsCreatedDate?: Date;
  productId?: number;
  productName?: string;
  productShortenCode?: string;
  productImageUrl?: string;
  productQuote?: string;
  seoTitle?: string;
  seoPath?: string;
  seoDescription?: string;
  seoKeyword?: string;
  productDescription?: any;
}

export class Seo implements ISeo {
  constructor(
    public newsId?: number,
    public newsTitle?: string,
    public newsShortenCode?: string,
    public newsThumbnailUrl?: string,
    public newsQuote?: string,
    public newsContent?: any,
    public newsCreatedDate?: Date,
    public productId?: number,
    public productName?: string,
    public productShortenCode?: string,
    public productImageUrl?: string,
    public productQuote?: string,
    public seoTitle?: string,
    public seoPath?: string,
    public seoDescription?: string,
    public seoKeyword?: string,
    public productDescription?: any
  ) {}
}
