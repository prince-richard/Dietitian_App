import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-recipemanager',
  templateUrl: './recipemanager.component.html',
  styleUrls: ['./recipemanager.component.scss']
})
export class RecipemanagerComponent implements OnInit {
  recipes = [];
  recipe = {};
  
  constructor(
    private http: HttpClient,
    private router: Router,
    ) { }

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

  editRecipe() {
    this.router.navigate(['dashboard/recipeedit']);
  }

  select(recipe){
    this.http.get("api/recipe/getrecipe?id=" + recipe.Id)
    .subscribe(res =>{
      this.recipe = res;
    })
  }
  

}