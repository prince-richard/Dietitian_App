import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { post } from 'selenium-webdriver/http';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-groupedit',
  templateUrl: './groupedit.component.html',
  styleUrls: ['./groupedit.component.scss']
})
export class GroupeditComponent implements OnInit {
  id: string;
  group: any;
  recipes: any;
  users: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
      
     }

    ngOnInit() {
      this.id = this.route.snapshot.queryParamMap.get('id');
      console.log(this.id);
      if (this.id == null) { this.id = sessionStorage.getItem("id") };
      console.log(this.id);
      if (this.id == "0"){
        this.group = {};
        this.group['Id']="0";
        this.group['Name']="undefined";
      }
      else {
        this.http.get("/api/group/getgroup?id="+this.id).subscribe(res =>{
          this.group = res["group"];
          this.recipes = res["recipes"];
          this.users = res["users"];
        });
      }
    }
    
    saveGroup() {
      alert('temporary alert');
    }

    submit() {
      alert('temporary alert');
    }

}
