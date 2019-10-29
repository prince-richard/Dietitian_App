import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipemanagerService } from './recipemanager.service';



@Component({
  selector: 'app-recipemanager',
  templateUrl: './recipemanager.component.html',
  styleUrls: ['./recipemanager.component.scss']
})
export class RecipemanagerComponent implements OnInit {
  recipes = [];
  recipe = {};
  
  constructor(service: RecipemanagerService,
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

  editRecipe(rec) {
    if (rec == null){
      this.router.navigate(['dashboard/recipeedit'],{ queryParams: { id: 0 } });
    }else{
      this.router.navigate(['dashboard/recipeedit'],{ queryParams: { id: rec.Id } });
    }
    
  }

  select(recipe){
    this.http.get("api/recipe/getrecipe?id=" + recipe.Id)
    .subscribe(res =>{
      this.recipe = res;
//      this.router.navigate(['dashboard/recipeedit']);

    })
  }
  

}