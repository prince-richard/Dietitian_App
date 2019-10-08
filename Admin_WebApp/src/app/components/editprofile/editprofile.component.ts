import { Component, OnInit } from '@angular/core';
import { EditprofileService, User } from './editprofile.service'
import { NgForm } from '@angular/forms';
import { snaAlertService } from '../../modules/sna-alert/snaAlertModule';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {

  constructor(
    private EditprofileService: EditprofileService,
    private snaAlertService: snaAlertService,
  ) { }

  ngOnInit() {
  }

  currentuser: User = this.EditprofileService.getloggedin_data();
  confirmed: boolean;
  currpass: string;
  newpass: string;
  confpass: string;

  onProfileSubmit(form: NgForm) {
    if (form.valid) {
    console.log("profile changed");
    this.EditprofileService.changeprofiledata(this.currentuser)
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

  onPasswordSubmit(form: NgForm) {
    if (form.valid) {
      this.EditprofileService.changepassword(this.currentuser.Email, this.currpass, this.newpass)
        .subscribe(
          res => {
          form.resetForm();
          this.snaAlertService.Alert(res.message);
          },
          err => {
          console.log(err);
          this.snaAlertService.Alert(err.error.message);
          });
    }
  }

}
