import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ProductViewService } from './product-view.service';
import { IProduct, Product, ProductType } from 'app/model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-public-product',
  templateUrl: './product-view.component.html',
  styleUrls: ['product-view.scss']
})
export class ProductViewComponent implements OnInit {
  products?: IProduct[];
  biomassProducts?: IProduct[];
  lohoiProducts?: IProduct[];
  giaiphapProducts?: IProduct[];

  constructor(protected activatedRoute: ActivatedRoute, private productViewService: ProductViewService) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(() => {
      this.loadAll();
      window.scrollTo(0, 0);
    });
  }

  private loadAll(): void {
    this.productViewService.query().subscribe((res: HttpResponse<Product[]>) => this.loadAllOnSuccess(res.body));
  }

  protected loadAllOnSuccess(data: IProduct[] | null): void {
    this.biomassProducts = [];
    this.lohoiProducts = [];
    this.giaiphapProducts = [];
    this.products = data ? data : [];

    for (const val of this.products) {
      switch (val.productType) {
        case ProductType.BIOMASS:
          this.biomassProducts.push(val);
          break;
        case ProductType.LO_HOI:
          this.lohoiProducts.push(val);
          break;
        case ProductType.GIAI_PHAP:
          this.giaiphapProducts.push(val);
          break;
        default:
          break;
      }
    }
  }
}
