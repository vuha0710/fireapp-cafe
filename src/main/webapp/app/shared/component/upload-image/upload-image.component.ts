import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UploadFileService } from '../upload-file/upload-file.service';
import { HttpResponse } from '@angular/common/http';
import { FileDTO } from 'app/model/file.dto';

@Component({
  selector: 'jhi-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  @Input() previewImageUrl: string | undefined;

  @Output()
  selectFileDTO: EventEmitter<FileDTO> = new EventEmitter<FileDTO>();

  fileDTO!: FileDTO;

  constructor(private uploadFileService: UploadFileService) {}

  ngOnInit(): void {
    if (this.previewImageUrl) {
      this.fileDTO = new FileDTO();
      this.fileDTO.fileUri = this.previewImageUrl;
    }
  }

  preview({ files }: { files: any }): void {
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.uploadFileService.upload(files[0]).subscribe(event => {
      if (event instanceof HttpResponse) {
        this.fileDTO = event.body;
        this.selectFileDTO.emit(this.fileDTO);
      }
    });
  }
}
