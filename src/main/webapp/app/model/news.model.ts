export interface INews {
  id?: number;
  title?: string;
  shortenCode?: string;
  thumbnailUrl?: string;
  quote?: string;
  content?: any;
  createdDate?: Date;
  seoTitle?: string;
  seoPath?: string;
  seoDescription?: string;
  seoKeyword?: string;
}

export class News implements INews {
  constructor(
    public id?: number,
    public title?: string,
    public shortenCode?: string,
    public thumbnailUrl?: string,
    public quote?: string,
    public content?: any,
    public createdDate?: Date,
    public seoTitle?: string,
    public seoPath?: string,
    public seoDescription?: string,
    public seoKeyword?: string
  ) {}
}
