import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product, ProductType } from 'app/model/product.model';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FileDTO } from 'app/model/file.dto';
import { ProductService } from './product.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { interval, Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'jhi-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.scss']
})
export class ProductViewComponent implements OnInit {
  counter_!: Observable<number>;
  count = 6;

  product!: Product;
  isSaving = false;
  description!: string;
  productTypes = [ProductType.BIOMASS, ProductType.LO_HOI, ProductType.GIAI_PHAP];

  public options: Object = {
    imageUploadURL: '/api/public/files/images',
    imageMaxSize: 5 * 1024 * 1024,
    imageUploadMethod: 'POST',
    // Set the load images request URL.
    imageManagerLoadURL: 'http://localhost:8080/',
    //  imageUploadURL: 'http://i.froala.com/upload',

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
    name: ['', [Validators.required]],
    quote: [],
    description: [],
    productType: [ProductType.LO_HOI],
    seoTitle: [],
    seoPath: [],
    seoDescription: [],
    seoKeyword: []
  });

  config: AngularEditorConfig = {
    editable: true,
    height: '40rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: []
  };

  constructor(private productService: ProductService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ product }) => {
      this.product = product;
      this.product.id && this.updateForm(product);
    });

    // if (this.product.id) {
    //   this.counter_ = timer(0, 1000).pipe(
    //     take(this.count),
    //     map(() => --this.count)
    //   );
    //   interval(6000)
    //     .subscribe(() => {
    //       this.count = 6;
    //       // this.save();
    //
    //       this.counter_ = timer(0, 1000).pipe(
    //         take(this.count),
    //         map(() => --this.count)
    //       );
    //     });
    // }
  }

  saveAction(): void {
    this.save();
    Swal.fire('Chúc Mừng', 'Nội dung đã được lưu thành công!', 'success').then();
  }

  private updateProduct(item: Product): void {
    item.id = this.editForm.get(['id'])!.value;
    item.name = this.editForm.get(['name'])!.value;
    item.quote = this.editForm.get(['quote'])!.value;
    item.seoTitle = this.editForm.get(['seoTitle'])!.value;
    item.seoPath = this.editForm.get(['seoPath'])!.value;
    item.seoDescription = this.editForm.get(['seoDescription'])!.value;
    item.seoKeyword = this.editForm.get(['seoKeyword'])!.value;
    item.productType = this.editForm.get(['productType'])!.value;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    this.updateProduct(this.product);

    this.product.description = this.description;
    if (this.product.id) {
      this.productService.update(this.product).subscribe(
        () => {},
        () => this.onSaveError()
      );
    } else {
      this.productService.create(this.product).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(item: Product): void {
    this.editForm.patchValue({
      id: item.id,
      name: item.name,
      quote: item.quote,
      seoTitle: item.seoTitle,
      seoDescription: item.seoDescription,
      seoKeyword: item.seoKeyword,
      seoPath: item.seoPath,
      productType: item.productType
    });
    this.description = item.description;
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  handleSelectFileDTO(fileDTO: FileDTO): void {
    this.product.imageUrl = fileDTO.fileUri;
  }
}
