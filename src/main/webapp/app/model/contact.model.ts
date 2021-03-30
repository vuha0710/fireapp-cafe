export interface IContact {
  id?: number;
  fullname?: string;
  email?: string;
  phone?: string;
  seen?: boolean;
  content?: any;
}

export class Contact implements IContact {
  constructor(
    public id?: number,
    public fullname?: string,
    public email?: string,
    public phone?: string,
    public seen?: boolean,
    public content?: any
  ) {
    this.seen = this.seen || false;
  }
}
