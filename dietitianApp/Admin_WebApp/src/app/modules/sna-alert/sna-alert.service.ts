//core imports
import { Injectable, Output, EventEmitter, TemplateRef } from '@angular/core';
import 'rxjs/add/operator/toPromise';

//component imports
import { Alert } from './alert';

@Injectable()
export class snaAlertService {
    alert: Alert = new Alert();
    @Output() createAlert: EventEmitter<Alert> = new EventEmitter();

    constructor() { }
   

    successAlert(message: string, timeout?: number) {
        this.alert.timeout = false;
        this.alert.type = 'success';
        this.alert.message = message;
       this.createAlert.emit(this.alert);
        if(timeout)
          setTimeout(() => this.alert.timeout = true, timeout);
        else
          setTimeout(() => this.alert.timeout = true, 5000);
    }

    infoAlert(message: string, timeout?: number) {
        this.alert.timeout = false;
        this.alert.type = 'info';
        this.alert.message = message;
        this.createAlert.emit(this.alert);
        if(timeout)
          setTimeout(() => this.alert.timeout = true, timeout);
        else
          setTimeout(() => this.alert.timeout = true, 5000);
    }
   
    warningAlert(message: string, timeout?: number) {
        this.alert.message = message;
        this.createAlert.emit(this.alert);
    }

    Alert(message: string, timeout?: number) {
      this.warningAlert(message, timeout);
    }

    getAlertInfo() {
        console.log(this.createAlert);
        return this.createAlert;
    }
}
