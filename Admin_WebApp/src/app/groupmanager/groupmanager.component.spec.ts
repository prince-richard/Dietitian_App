import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupmanagerComponent } from './groupmanager.component';

describe('GroupmanagerComponent', () => {
  let component: GroupmanagerComponent;
  let fixture: ComponentFixture<GroupmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
