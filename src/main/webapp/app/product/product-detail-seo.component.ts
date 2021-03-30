import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ProductViewService } from 'app/product/product-view.service';
import { Meta, Title } from '@angular/platform-browser';
import { Seo } from 'app/model/seo.model';
import { DATE_TIME_NEWS } from 'app/shared/constants/input.constants';

@Component({
  selector: 'jhi-product-detail-seo',
  templateUrl: './product-detail-seo.component.html',
  styleUrls: ['product-detail-seo.scss']
})
export class ProductPublicDetailSeoComponent implements OnInit {
  seo!: Seo;
  DATE_FORMAT = DATE_TIME_NEWS;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private productService: ProductViewService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ seo }) => {
      this.seo = seo;
      window.scrollTo(0, 0);
      this.titleService.setTitle(seo.seoTitle);
      this.metaService.updateTag({ name: 'url', content: window.location.href });
      this.metaService.updateTag({ name: 'description', content: seo.seoDescription });
      this.metaService.updateTag({ name: 'keywords', content: seo.seoKeyword });

      this.metaService.updateTag({ property: 'og:url', content: window.location.href });
      this.metaService.updateTag({ property: 'og:title', content: seo.seoTitle });
      this.metaService.updateTag({ property: 'og:keywords', content: seo.seoKeyword });
      this.metaService.updateTag({ property: 'og:description', content: seo.seoDescription });

      this.metaService.updateTag({ name: 'twitter:url', content: window.location.href });
      this.metaService.updateTag({ name: 'twitter:title', content: seo.seoTitle });
      this.metaService.updateTag({ name: 'twitter:keywords', content: seo.seoKeyword });
      this.metaService.updateTag({ name: 'twitter:description', content: seo.seoDescription });
    });
  }
}
