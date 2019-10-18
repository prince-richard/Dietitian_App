import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';


@Component({
  selector: 'app-recipemanager',
  templateUrl: './recipemanager.component.html',
  styleUrls: ['./recipemanager.component.scss']
})
export class RecipemanagerComponent implements OnInit {
  recipes = [];
  recipe = {};
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("api/recipe/allrecipes")
    .subscribe(res =>{
      this.recipes = res as any;
      //alert(JSON.stringify(this.recipes))
    })
  }
  
  getRecipeSteps(){
    this.http.get("api/recipe/getrecipe")
    .subscribe(res =>{
      this.recipes = res as any;
    })
  }

  select(recipe){
    this.http.get("api/recipe/getrecipe?id=" + recipe.Id)
    .subscribe(res =>{
      this.recipe = res;
    })
  }
  

}