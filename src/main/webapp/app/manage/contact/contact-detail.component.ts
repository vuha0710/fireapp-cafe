import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IContact } from 'app/model/contact.model';
import { ContactService } from 'app/manage/contact/contact.service';

@Component({
  selector: 'jhi-contact-detail',
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {
  contact: IContact | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected contactService: ContactService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.contact = contact;
      if (this.contact && this.contact.id) {
        this.readContact(this.contact.id);
      }
    });
  }

  private readContact(id: number): void {
    this.contactService.read(id).subscribe();
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
