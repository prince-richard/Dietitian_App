import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-groupedit',
  templateUrl: './groupedit.component.html',
  styleUrls: ['./groupedit.component.scss']
})
export class GroupeditComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  
  submit(){
    alert("name");
    //send update from to server
  }

}
