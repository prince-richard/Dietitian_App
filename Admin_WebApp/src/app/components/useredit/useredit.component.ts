import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsermanagerService, UserProfile, Roles } from '../usermanager/usermanager.service';
import { concat } from 'rxjs';
import { AlertsService } from 'angular-alert-module';
import { snaAlertService } from '../../modules/sna-alert/snaAlertModule';

@Component({
  selector: 'app-useredit',
  templateUrl: './useredit.component.html',
  styleUrls: ['./useredit.component.scss']
})
export class UsereditComponent implements OnInit {

  customer: any;
  userid = this.route.snapshot.params['id'];
  user = new UserProfile();
  confirmed: boolean;
  currpass: string;
  newpass: string;
  confpass: string;
  userroles = [];
  roles: Roles = new Roles();
  norole: boolean = false;
  roleselected: string;

  constructor(
    private UsermanagerService: UsermanagerService,
    private router: Router,
    private route: ActivatedRoute,
    private snaAlertService: snaAlertService) { }

  ngOnInit() {
    this.UsermanagerService.getUser(this.userid)
      .subscribe(
        res => {
          this.user = res;
          this.getroles();
          this.getuserrole(this.user.Email);
        },
          err => {
          console.log(err);
          this.snaAlertService.Alert(err.error.message);
        });
  }

  

  adduserrole(role: string) {
    this.UsermanagerService.addUserRole(this.user.Email, role)
        .subscribe(
          res => {
            this.getuserrole(this.user.Email);
            this.roleselected = "";
            this.snaAlertService.Alert(res.message);
          },
          err => {
            console.log(err);
            this.snaAlertService.Alert(err.error.message);
          }
        );
  }


  removeuserrole(role: string) {
    this.UsermanagerService.removeUserRole(this.user.Email, role)
      .subscribe(
        res => {
          this.remove(role);
          this.snaAlertService.Alert(res.message);
        },
        err => {
          console.log(err);
          this.snaAlertService.Alert(err.error.message);
        });
  }

  remove(role: any): void {
    let index = this.userroles.indexOf(role);

    if (index >= 0) {
      this.userroles.splice(index, 1);
    }
  }

  getuserrole(email: string) {
    this.UsermanagerService.getUserRole(email)
      .subscribe(
        res => {
          this.userroles = res;
        },
        err => {
        console.log(err);
        this.snaAlertService.Alert(err.error.message);
        });
  }

  getroles() {
    this.UsermanagerService.getRoles()
      .subscribe(
        res => {
          this.roles = res;
        },
        err => {
        console.log(err);
        this.snaAlertService.Alert(err.error.message);
        });
  }

  back(): void {
    window.history.back();
  }

  onUserProfileSubmit(form: NgForm) {
    if (form.valid) {
      this.UsermanagerService.UserProfileSubmit(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.snaAlertService.Alert(res.message);
        },
        err => {
          console.log(err);
          this.snaAlertService.Alert(err.error.message);
        });
    }
  }

  userPasswordSubmit(form: NgForm) {
    if (form.valid) {
      this.UsermanagerService.userPasswordSubmit(this.confpass, this.user.Email)
        .subscribe(
          res => {
            console.log(res);
            form.reset();
          this.snaAlertService.Alert(res.message);
        },
        err => {
          console.log(err);
          this.snaAlertService.Alert(err.error.message);
        });
    }
  }

}
