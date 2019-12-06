import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMonitorComponent } from './message-monitor.component';

describe('MessageMonitorComponent', () => {
  let component: MessageMonitorComponent;
  let fixture: ComponentFixture<MessageMonitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMonitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
