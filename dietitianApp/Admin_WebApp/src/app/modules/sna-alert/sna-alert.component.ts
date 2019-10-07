import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { Alert } from './alert';
import { snaAlertService } from './sna-alert.service';

@Component({
  selector: 'sna-alert',
  templateUrl: './sna-alert.component.html',
  styleUrls: ['./sna-alert.component.css'],
  //providers: [snaAlertService]
})

export class snaAlertComponent implements OnInit {
  alertConfig: Alert = new Alert();
  @ViewChild('alertmodal') public alertmodal: TemplateRef<any>;
  isModalShown: boolean = false;

  constructor( private snaAlertService: snaAlertService) { }

  ngOnInit(): void {
    this.alertConfig = this.snaAlertService.getAlertInfo()
        .subscribe(
        (result: Alert) => {
          this.alertConfig = result;
          var x = document.getElementById("snackbar");
          var y = document.getElementById("snackbarparent");
          x.className = "show";
          y.className = "show";
          setTimeout(function () { y.className = y.className.replace("show", ""); }, 2500);
          setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
          console.log(this.alertConfig, this.alertmodal);
        });
}
}
