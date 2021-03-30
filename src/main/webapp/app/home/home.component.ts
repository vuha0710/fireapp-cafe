import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoginModalService } from 'app/core/login/login-modal.service';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from 'app/home/home.service';
import { HttpResponse } from '@angular/common/http';
import { HomeData, HomePartner, IHomeData } from 'app/model/home.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'jhi-home',
  templateUrl: './home.component.html',
  styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  account: Account | null = null;
  authSubscription?: Subscription;
  showPartnerData?: HomePartner;
  homeData?: IHomeData;
  content!: string;

  public options: Object = {
    charCounterCount: true,

    imageUploadURL: '/api/public/files',
    imageMaxSize: 5 * 1024 * 1024,
    imageUploadMethod: 'POST',
    // Set the load images request URL.
    imageManagerLoadURL: 'http://localhost:8080/'

    //  imageUploadURL: 'http://i.froala.com/upload'
  };

  constructor(
    private route: ActivatedRoute,
    private accountService: AccountService,
    private homeService: HomeService,
    private loginModalService: LoginModalService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.accountService.getAuthenticationState().subscribe(account => (this.account = account));
    this.route.data.subscribe(() => {
      window.scrollTo(0, 0);
      this.loadDataHome();
    });
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.loginModalService.open();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  private loadDataHome(): void {
    this.homeService.get().subscribe((res: HttpResponse<HomeData>) => {
      this.homeData = res.body ? res.body : {};
      if (this.homeData && this.homeData.partnerDataList) {
        this.showPartnerData = this.homeData.partnerDataList[0];
      }
    });
  }

  partnerChoose(partner: HomePartner | null): void {
    if (partner != null) {
      this.showPartnerData = partner;
    }
  }

  refresh(): void {
    Swal.fire('Lỗi rồi', this.content, 'error').then();
  }
}
