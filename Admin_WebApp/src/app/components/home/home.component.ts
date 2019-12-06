import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { AccountService } from '../login/account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private AccountService: AccountService
    ) { 
  }
    logedinuser: string;
    customer: string;
    id: string;

  ngOnInit() {
    this.logedinuser = sessionStorage.getItem("firstname");
    this.customer = sessionStorage.getItem("customer")
    this.id = sessionStorage.getItem("id")
  }

  /*
  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id == "0"){
      this.user = {};
      this.user['Id']="0";
      this.user['Name']="undefined";
    }else{
    this.http.get("/api/user/getuser?id="+this.id)
    .subscribe(res =>{
      this.user = res;
    })
  }
}


  getData(){
    this.id = this.route.snapshot.queryParamMap.get('id');
      if (this.id == "0"){
        this.user = {};
        this.user['Id']="0";
        this.user['Name']="undefined";
      }else{
      this.http.get("/api/user/getuser?id="+this.id)
      .subscribe(res =>{
        this.user = res;
      })
    }
  }
  */

}
