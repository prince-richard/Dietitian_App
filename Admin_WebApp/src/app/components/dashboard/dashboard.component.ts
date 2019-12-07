import { Component, OnInit } from '@angular/core';
import { AccountService } from '../login/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
    private AccountService: AccountService
  ) { }
  logedinuser: string;
  customer: string;
  id: any;
  isCollapsed: boolean;
  isUserCollapsed: boolean;
  ngOnInit() {
    this.logedinuser = sessionStorage.getItem("firstname");
    this.customer = sessionStorage.getItem("customer");
  }

  logout() {
    this.AccountService.logout();
    this.router.navigate(['/login']);
  }
}
