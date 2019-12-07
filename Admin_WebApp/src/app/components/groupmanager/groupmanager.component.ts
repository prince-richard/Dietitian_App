import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-groupmanager',
  templateUrl: './groupmanager.component.html',
  styleUrls: ['./groupmanager.component.scss']
})

export class GroupmanagerComponent implements OnInit {
  groups = [];
  group = {};
  showGroup = false;
  id: string;

  constructor( private http: HttpClient,  private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.http.get("api/group/allgroups")
    .subscribe(res =>{
      //if id isnt null, groups.filter(id);
      this.groups = res as any;
    });
  }

  editGroup(group) {
    console.log(group);
    if (group == null){
      this.router.navigate(['dashboard/groupedit'],{ queryParams: { id: 0 } });
    }else{
      this.router.navigate(['dashboard/groupedit'],{ queryParams: { id: group.DieticianId } });
    }
  }
  
  submit(){
    alert(this.group['name']);
    //send update from to server
  }
  select(group){
    this.http.get("api/group/getgroup?id=" + group.Id)
    .subscribe(res=>{
      this.showGroup = true;
      this.group = group;
    })
   
  }
}
