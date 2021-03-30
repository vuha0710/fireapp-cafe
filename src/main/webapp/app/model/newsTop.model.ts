export interface INewsTop {
  id?: number;
  title?: string;
  shortenCode?: string;
  thumbnailUrl?: string;
  quote?: string;
  day?: string;
  month?: string;
  year?: string;
}

export class NewsTop implements INewsTop {
  constructor(
    public id?: number,
    public title?: string,
    public shortenCode?: string,
    public thumbnailUrl?: string,
    public quote?: string,
    public day?: string,
    public month?: string,
    public year?: string
  ) {}
}
