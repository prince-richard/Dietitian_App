import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';


@Component({
  selector: 'app-test',
  templateUrl: './rmtest.component.html',
  styleUrls: ['./rmtest.component.scss']
})
export class RmtestComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {

  }
}
