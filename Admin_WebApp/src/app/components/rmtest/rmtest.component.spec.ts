import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmtestComponent } from './rmtest.component';

describe('RmtestComponent', () => {
  let component: RmtestComponent;
  let fixture: ComponentFixture<RmtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
