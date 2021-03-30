export interface IFileDTO {
  fileName?: string;
  fileUri?: string;
  fileType?: string;
  size?: number;
}

export class FileDTO implements IFileDTO {
  constructor(public size?: number, public fileName?: string, public fileUri?: string, public fileType?: string) {}
}
