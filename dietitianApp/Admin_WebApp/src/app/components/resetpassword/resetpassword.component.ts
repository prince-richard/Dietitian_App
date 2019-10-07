import { Component, OnInit } from '@angular/core';
import { AccountService } from '../login/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { snaAlertService } from '../../modules/sna-alert/snaAlertModule';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private AccountService: AccountService,
    private snaAlertService: snaAlertService
  ) { }
  public newpass: string;
  public confirm_pass: string;
  private email: string;
  private token: string;
  private passresettoken: string;
  token_verified: boolean = true;

  ngOnInit() {
    let email = this.route.snapshot.queryParams['email'];
    let emailtoken = this.route.snapshot.queryParams['token'];
    this.email = email;
    this.token = emailtoken;
    this.verifyemailtoken();
  }

  verifyemailtoken() {
    console.log(this.token);
    this.AccountService.verifyemailtoken(this.email, this.token)
      .subscribe(res => {
        this.passresettoken = res.token;
      },
        err => {
          this.snaAlertService.Alert("Incorrect token");
        });
  }

  reset(f: NgForm) {
    if (f.valid) {
      this.AccountService.passwordreset(this.email, this.passresettoken, this.confirm_pass)
        .subscribe(res => {
          this.router.navigate(['/login']);
          this.snaAlertService.Alert("Password Successfully Changed");
        },
        err => {
          this.snaAlertService.Alert(err.error);
        });
    }
  }

}
