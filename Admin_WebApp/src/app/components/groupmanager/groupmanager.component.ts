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
    this.id = this.route.snapshot.queryParamMap.get('id');
    this.http.get("api/group/allgroups")
      .subscribe(res =>{
        //if id isnt null, groups.filter(id);
        this.groups = res as any;
      })
  }

  editGroup(group) {
    if (group == null){
      this.router.navigate(['dashboard/groupedit'],{ queryParams: { id: 0 } });
    }else{
      this.router.navigate(['dashboard/groupedit'],{ queryParams: { id: group.Id } });
    }
    
  }

  //JSON object
  getData(){
    /*
    this.groups=[
      {
        id:1,
        name:"johnson",
        "location":"Patterson"
        "users":[
          {
            Id:1,
            name:"cole",
            groupId:1
          },
          {
            Id:2,
            name:"zach",
            groupId:1
          },
        ],
        "recipes":[
          {
            Id:1,
            name:"burger",
            groupId:1
          },
          {
            Id:2,
            name:"zach",
            groupId:1
          }
        ],
      },
      {id:2,name:"smith","location":"New Yor"},
      {id:3,name:"Hermann","location":"Patterson"},
      {id:4,name:"Darlton","location":"Patterson"},
      {id:6,name:"Will","location":"Patterson"},
    ];
    this.group = this.groups[0];
*/
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
