import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { TokenService } from './token.service';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';
import { snaAlertService } from '../../modules/sna-alert/snaAlertModule';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private AccountService: AccountService,
    private LoadingSpinnerService: LoadingSpinnerService,
    private TokenService: TokenService,
    private router: Router,
    private snaAlertService: snaAlertService,
    private modalService: NgbModal
  ) { }

  femail: string = "";
  content: NgbModalRef;

  ngOnInit() {
  }

  open(content) {
    this.content = this.modalService.open(content, { windowClass: 'dark-modal', size: 'sm' });
  }

  onSubmit(f: NgForm) {
    if (f.valid) {
      this.LoadingSpinnerService.set_progress(true);
      const { Email, Password } = f.value;
      this.AccountService
        .login(Email, Password)
        .subscribe(
          res => {
            console.log("Fetched token");
            this.router.navigate(['/dashboard']);
            this.LoadingSpinnerService.set_progress(false);
          },
          err => {
            console.log(err);
            this.LoadingSpinnerService.set_progress(false);
            this.snaAlertService.Alert("Email or Password Incorrect");
          });
    }
  }

  onSubmitRecovery(form: NgForm) {
    if (form.valid) {
      this.AccountService.accountrecovery(this.femail)
        .subscribe(res => {
          this.snaAlertService.Alert(res.message);
          this.content.close();
        },
        err => {
          this.snaAlertService.Alert(err.error);
          this.content.close();
        });
    }
  }
}
