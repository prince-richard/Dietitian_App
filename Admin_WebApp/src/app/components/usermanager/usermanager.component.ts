import { Component, OnInit } from '@angular/core';
import { UsermanagerService } from './usermanager.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { LoadingSpinnerService } from '../loading-spinner/loading-spinner.service';
import { snaAlertService } from '../../modules/sna-alert/snaAlertModule';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.scss']
})
export class UsermanagerComponent implements OnInit {

  users: any;
  constructor(private UsermanagerService: UsermanagerService,
    private router: Router,
    private LoadingSpinnerService: LoadingSpinnerService,
    private snaAlertService: snaAlertService ) { }

  ngOnInit() {
    this.getUsers();
  }

  submituser(operation: number) {
    this.router.navigate(['dashboard/usermodification/' + operation]);
  }

  lockupdate(userid: number, operation: boolean) {
    this.UsermanagerService.lockupdate(userid,operation)
      .subscribe(
      res => {
        this.refresh();
          this.snaAlertService.Alert(res.message);
        },
        err => {
          console.log("err", err);
          this.snaAlertService.Alert(err.error.message);
        }
      );
  }

  createuser() {
    this.router.navigate(['dashboard/newuser']);
  }

  refresh() {
    this.UsermanagerService.getUsers()
      .subscribe(
        res => {
          this.users = res;
        },
        err => {
          console.log("err", err);
          this.snaAlertService.Alert(err.error.message);
        }
      );
  }

  getUsers() {
    this.LoadingSpinnerService.set_progress(true);
    this.UsermanagerService.getUsers()
      .subscribe(
        res => {
          this.users = res;
          this.LoadingSpinnerService.set_progress(false);
        },
        err => {
          console.log("err", err);
          this.snaAlertService.Alert(err.error.message);
          this.LoadingSpinnerService.set_progress(false);
        }
      );
  }
}
