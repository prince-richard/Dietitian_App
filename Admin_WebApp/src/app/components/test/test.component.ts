import { Component, OnInit } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  recipe: any;
  docs: any;
  localFile: any;
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
  fileChangeEvent(files: FileList) {

    let fileToUpload = files.item(0);

    let input: FormData = new FormData();
    input.append('fileKey', fileToUpload, fileToUpload.name);
    input.append('fileName', fileToUpload.name);

    this.http.post("api/recipe/uploadFile", input)
    .subscribe(res  =>{
      alert(res);
    });
  }

}
