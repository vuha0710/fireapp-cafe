import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { Contact } from 'app/model/contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'jhi-contact-delete-dialog',
  templateUrl: './contact-delete-dialog.component.html'
})
export class ContactDeleteDialogComponent {
  contact?: Contact;

  constructor(private contactService: ContactService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.contactService.delete(id).subscribe(() => {
      this.eventManager.broadcast('contactListModification');
      this.activeModal.close();
    });
  }
}
