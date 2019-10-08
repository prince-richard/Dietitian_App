import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsermanagerService, NewUser, Roles } from '../usermanager/usermanager.service';
import { concat } from 'rxjs';
import { snaAlertService } from '../../modules/sna-alert/snaAlertModule';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  customer: any;
  newuser: NewUser = new NewUser();
  newpass: string;
  checkroleid = [];
  roles: Roles = new Roles();

  constructor(
    private UsermanagerService: UsermanagerService,
    private router: Router,
    private route: ActivatedRoute,
    private snaAlertService: snaAlertService) { }

  ngOnInit() {
    this.getroles();
  }

  back(): void {
    window.history.back();
  }

  getroles() {
    this.UsermanagerService.getRoles()
      .subscribe(
        res => {
          this.roles = res;
        },
        err => {
          console.log("err", err);
        }
      );
  }

  
  createUser(form: NgForm) {
    this.newuser.rolestring = [];
    if (form.valid) {
      for (let i in this.roles) {
        if (this.roles[i].Checked) {
          this.newuser.rolestring.push(this.roles[i].Name);
        }
      }
      this.UsermanagerService.create_user(this.newuser)
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
    else {
      this.snaAlertService.Alert("Please Enter Valid Information.");
    }
  }

}
