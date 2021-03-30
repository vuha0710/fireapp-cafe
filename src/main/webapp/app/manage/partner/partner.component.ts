import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { IPartner, Partner } from 'app/model/partner.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { PartnerService } from './partner.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PartnerDeleteDialogComponent } from 'app/manage/partner/partner-delete-dialog.component';

@Component({
  selector: 'jhi-partner',
  templateUrl: './partner.component.html'
})
export class PartnerComponent implements OnInit, OnDestroy {
  partners?: IPartner[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  previousPage!: number;

  constructor(
    protected partnerService: PartnerService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.previousPage = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.loadAll();
    });
    this.eventSubscriber = this.eventManager.subscribe('partnerListModification', () => this.loadAll());
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  loadPage(page: number): void {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  trackId(index: number, item: IPartner): number {
    return item.id!;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IPartner[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.partners = data ? data : [];
  }

  private loadAll(): void {
    this.partnerService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<Partner[]>) => this.onSuccess(res.body, res.headers));
  }

  deletePartner(partner: Partner): void {
    const modalRef = this.modalService.open(PartnerDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.partner = partner;
  }
}
