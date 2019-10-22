import { Component } from '@angular/core';
import { LoadingSpinnerService } from './components/loading-spinner/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  progress: boolean = false;
  constructor(private LoadingSpinnerService: LoadingSpinnerService) { }

  ngOnInit(): void {
    this.progress = this.LoadingSpinnerService.get_progress().subscribe((result: boolean) => this.progress = result);
    this.LoadingSpinnerService.set_progress(false);
  }
}
