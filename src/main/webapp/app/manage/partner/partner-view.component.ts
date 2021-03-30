import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Partner } from 'app/model/partner.model';
import { PartnerService } from './partner.service';
import { FileDTO } from 'app/model/file.dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-partner-mgmt-view',
  templateUrl: './partner-view.component.html'
})
export class PartnerViewComponent implements OnInit {
  partner!: Partner;
  isSaving = false;
  points = [1, 2, 3, 4, 5];

  editForm = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    ratePoint: [5],
    rateUser: [],
    rateComment: []
  });

  constructor(private partnerService: PartnerService, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.data.subscribe(({ partner }) => {
      this.partner = partner;
      this.partner.id && this.updateForm(partner);
    });
  }

  private updatePartner(partner: Partner): void {
    partner.id = this.editForm.get(['id'])!.value;
    partner.name = this.editForm.get(['name'])!.value;
    partner.ratePoint = this.editForm.get(['ratePoint'])!.value;
    partner.rateUser = this.editForm.get(['rateUser'])!.value;
    partner.rateComment = this.editForm.get(['rateComment'])!.value;
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    if (!this.partner.imageUrl) {
      Swal.fire('Lỗi rồi', 'Hình ảnh nên được tải lên!', 'error').then();
      return;
    }

    this.isSaving = true;
    this.updatePartner(this.partner);
    if (this.partner.id) {
      this.partnerService.update(this.partner).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    } else {
      this.partnerService.create(this.partner).subscribe(
        () => this.onSaveSuccess(),
        () => this.onSaveError()
      );
    }
  }

  private updateForm(partner: Partner): void {
    this.editForm.patchValue({
      id: partner.id,
      name: partner.name,
      ratePoint: partner.ratePoint,
      rateUser: partner.rateUser,
      rateComment: partner.rateComment
    });
  }

  private onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError(): void {
    this.isSaving = false;
  }

  handleSelectFileDTO(fileDTO: FileDTO): void {
    this.partner.imageUrl = fileDTO.fileUri;
  }
}
