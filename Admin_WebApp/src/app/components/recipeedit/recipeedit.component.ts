import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recipeedit',
  templateUrl: './recipeedit.component.html',
  styleUrls: ['./recipeedit.component.scss']
})
export class RecipeeditComponent implements OnInit {
  id: string;
  recipe: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) { 
   
  }

  ngOnInit() {
    this.id = this.route.snapshot.queryParamMap.get('id');
    if (this.id == "0"){
      this.recipe = {};
      this.recipe['Id']="0";
      this.recipe['Name']="undefined";
    }else{
    this.http.get("/api/recipe/getrecipe?id="+this.id)
    .subscribe(res =>{
      this.recipe = res;
    });
    }
  }
  saveRecipe(){
    this.http.put("/api/recipe/updaterecipe",this.recipe)
    .subscribe(res =>{
      this.recipe = res;
    }); 
  }

  submit(){
    alert("name");
    //send update from to server
  }
}
