import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { News } from 'app/model/news.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileDTO } from 'app/model/file.dto';
import { NewsService } from './news.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { interval, Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

// https://stackblitz.com/edit/angular-editor-wysiwyg?file=src%2Fapp%2Fapp.component.html
// https://www.npmjs.com/package/@kolkov/angular-editor
// https://angular-editor-wysiwyg.stackblitz.io/
// https://angular-editor.kolkov.ru/
@Component({
  selector: 'jhi-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.scss']
})
export class NewsViewComponent implements OnInit {
  counter_!: Observable<number>;
  count = 6;

  news!: News;
  isSaving = false;
  content!: string;

  public options: Object = {
    imageUploadURL: '/api/public/files/images',
    imageMaxSize: 5 * 1024 * 1024,
    imageUploadMethod: 'POST',
    // Set the load images request URL.
    imageManagerLoadURL: 'http://localhost:8080/',

    charCounterCount: false,
    fileUpload: false,
    attribution: false,
    toolbarButtons: [
      ['fullscreen', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'],
      ['fontFamily', 'fontSize', 'backgroundColor', 'textColor'],
      ['paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', '-', 'insertImage', 'embedly', 'insertTable', 'insertLink'],
      ['specialCharacters', 'insertHR', 'clearFormatting'],
      ['print', 'spellChecker'],
      ['undo', 'redo']
    ],
    toolbarSticky: false,
    fontFamily: {
      'Arial,Helvetica,sans-serif': 'Arial',
      "'Courier New',Courier,monospace": 'Courier New',
      'Georgia,serif': 'Georgia',
      'Impact,Charcoal,sans-serif': 'Impact',
      "'Lucida Console',Monaco,monospace": 'Lucida Console',
      'Tahoma,Geneva,sans-serif': 'Tahoma',
      "'Times New Roman',Times,serif": 'Times New Roman',
      'Verdana,Geneva,sans-serif': 'Verdana'
    }
  };

  editForm = this.fb.group({
    id: [],
    title: ['', [Validators.required]],
    quote: [],
    content: [],
    seoTitle: [],
    seoPath: [],
    seoDescription: [],
    seoKeyword: []
  });

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '40rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: []
  };

  constructor(private newsService: NewsService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.data.subscribe(({ news }) => {
      this.news = news;
      this.news.id && this.updateForm(news);
    });
  }

  private updateForm(item: News): void {
    this.editForm.patchValue({
      id: item.id,
      title: item.title,
      quote: item.quote,
      seoTitle: item.seoTitle,
      seoDescription: item.seoDescription,
      seoKeyword: item.seoKeyword,
      seoPath: item.seoPath
    });
    this.content = item.content;
  }

  previousState(): void {
    window.history.back();
  }

  saveAction(): void {
    this.save();
    Swal.fire('Chúc Mừng', 'Nội dung đã được lưu thành công!', 'success').then();
  }

  save(): void {
    this.news.id = this.editForm.get(['id'])!.value;
    this.news.title = this.editForm.get(['title'])!.value;
    this.news.quote = this.editForm.get(['quote'])!.value;
    this.news.content = this.content;
    this.news.seoTitle = this.editForm.get(['seoTitle'])!.value;
    this.news.seoPath = this.editForm.get(['seoPath'])!.value;
    this.news.seoDescription = this.editForm.get(['seoDescription'])!.value;
    this.news.seoKeyword = this.editForm.get(['seoKeyword'])!.value;

    this.isSaving = true;

    if (this.news.id) {
      this.newsService.update(this.news).subscribe(
        () => {},
        () => this.onSaveError()
      );
    } else {
      this.newsService.create(this.news).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  handleSelectFileDTO(fileDTO: FileDTO): void {
    this.news.thumbnailUrl = fileDTO.fileUri;
  }
}
