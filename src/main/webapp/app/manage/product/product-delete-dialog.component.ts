import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Product } from 'app/model/product.model';
import { ProductService } from 'app/manage/product/product.service';

@Component({
  selector: 'jhi-product-delete-dialog',
  templateUrl: './product-delete-dialog.component.html'
})
export class ProductDeleteDialogComponent {
  product?: Product;

  constructor(private productService: ProductService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productListModification');
      this.activeModal.close();
    });
  }
}
