import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { News } from 'app/model/news.model';
import { NewsService } from 'app/manage/news/news.service';

@Component({
  selector: 'jhi-news-delete-dialog',
  templateUrl: './news-delete-dialog.component.html'
})
export class NewsDeleteDialogComponent {
  news?: News;

  constructor(private newsService: NewsService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  clear(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.newsService.delete(id).subscribe(() => {
      this.eventManager.broadcast('newsListModification');
      this.activeModal.close();
    });
  }
}
