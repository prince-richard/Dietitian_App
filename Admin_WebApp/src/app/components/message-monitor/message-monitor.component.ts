import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Component({
  selector: 'app-message-monitor',
  templateUrl: './message-monitor.component.html',
  styleUrls: ['./message-monitor.component.scss']
})
export class MessageMonitorComponent implements OnInit {
  messages : any;
  users: any;
  userid: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get("api/user/allusers")
    .subscribe(res =>{
      this.users = res;
    })
  }
  getData(){
    this.http.get("api/message/GetMessages?userId="+this.userid+"&take=100")
    .subscribe(res =>{
      this.messages = res;
    })
  }

}
