import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';


@Component({
  selector: 'app-groupmanager',
  templateUrl: './groupmanager.component.html',
  styleUrls: ['./groupmanager.component.scss']
})
export class GroupmanagerComponent implements OnInit {
  groups = [];
  group = {};

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("api/group/allgroups")
      .subscribe(res =>{
        this.groups = res as any;
      })
  }
  getData(){
//    this.groups=[
//      {id:1,name:"johnson","location":"Patterson"},
//      {id:2,name:"smith","location":"New Yor"},
//      {id:3,name:"Hermann","location":"Patterson"},
//      {id:4,name:"Darlton","location":"Patterson"},
//      {id:6,name:"Will","location":"Patterson"},
//    ];
//    this.group = this.groups[0];
  }
  
  submit(){
    alert(this.group['name']);
    //send update from to server
  }
  select(group){
    this.group = group;
  }
}
