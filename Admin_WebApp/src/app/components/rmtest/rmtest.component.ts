import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RmtestService } from './rmtest.service';

@Component({
  selector: 'app-rmtest',
  templateUrl: './rmtest.component.html',
  styleUrls: ['./rmtest.component.scss']
})
export class RmtestComponent implements OnInit {
  recipes = []
  recipe = {}

  constructor(private service: RmtestService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.service.getRecipe()
  }

  getRecipe(){
    this.service.getRecipe()
    .subscribe(res =>{
      this.recipes = res as any;
    })
  }

  getRecipeSteps(){
    this.service.getRecipeSteps()
    .subscribe(res =>{
      this.recipes = res as any;
    })
  }

  editRecipe() {
    this.router.navigate(['dashboard/recipeedit']);
  }

/*
  select(recipe){
    this.service.selectRecipe()
    .subscribe(res =>{
      this.recipe = res;
    })
  }
*/
}
