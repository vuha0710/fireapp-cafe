import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Partner } from 'app/model/partner.model';
import { PartnerService } from 'app/manage/partner/partner.service';

@Component({
  selector: 'jhi-partner-delete-dialog',
  templateUrl: './partner-delete-dialog.component.html'
})
export class PartnerDeleteDialogComponent {
  partner?: Partner;

  constructor(private partnerService: PartnerService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.partnerService.delete(id).subscribe(() => {
      this.eventManager.broadcast('partnerListModification');
      this.activeModal.close();
    });
  }
}
