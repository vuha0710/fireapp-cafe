import { Component, OnInit } from '@angular/core';
import { Product } from 'app/model/product.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProductViewService } from 'app/product/product-view.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'jhi-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['product-detail.scss']
})
export class ProductPublicDetailComponent implements OnInit {
  product!: Product;

  constructor(
    private title: Title,
    private meta: Meta,
    private productService: ProductViewService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ product }) => {
      this.product = product;
      window.scrollTo(0, 0);
      this.title.setTitle(product.name);
      this.meta.updateTag({ name: 'description', content: product.quote });
    });
  }
}
