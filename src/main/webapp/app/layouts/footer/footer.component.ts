import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Contact } from 'app/model/contact.model';
import { ContactViewService } from 'app/layouts/footer/contact.service';

@Component({
  selector: 'jhi-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contact!: Contact;
  send = false;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10,11}$';

  editForm = this.fb.group({
    fullname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(this.mobnumPattern)]],
    content: ['', [Validators.required]]
  });

  constructor(private contactService: ContactViewService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contact = new Contact();
  }

  private updateDataForm(contact: Contact): void {
    contact.fullname = this.editForm.get(['fullname'])!.value;
    contact.phone = this.editForm.get(['phone'])!.value;
    contact.email = this.editForm.get(['email'])!.value;
    contact.content = this.editForm.get(['content'])!.value;
  }

  sendContact(): void {
    this.updateDataForm(this.contact);
    this.send = true;

    if (!this.editForm.valid) {
      return;
    }

    this.contactService.sendContact(this.contact).subscribe();
    Swal.fire('Ola', 'Yêu cầu gửi đi đã thành công. Chúng tôi sẽ liên hệ nhanh tới bạn!', 'success').then();
    this.editForm.reset();
    this.send = false;
  }
}
