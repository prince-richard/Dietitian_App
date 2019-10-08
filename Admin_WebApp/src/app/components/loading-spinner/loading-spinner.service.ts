import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {

  @Output() progress: EventEmitter<Boolean> = new EventEmitter();
  constructor() { }

  set_progress(status: boolean) {
    this.progress.emit(status);
    console.log(this.progress);
  }

  get_progress() {
    return this.progress;
  }
}

