import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  recipe: any;
  docs: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  getRecipe(){
    this.http.get("api/recipe/tests3")
    .subscribe(res  =>{
      this.recipe = res['recipe'][0];
      this.docs = res['docs'];
    });
  }
}
