import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RmtestService {

  constructor(private http: HttpClient) { }

  getRecipe(){
    return this.http.get("api/recipe/allrecipes")
  }

  getRecipeSteps(){
    return this.http.get("api/recipe/getrecipe")

  }

}
