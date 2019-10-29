import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeditComponent } from './groupedit.component';

describe('GroupeditComponent', () => {
  let component: GroupeditComponent;
  let fixture: ComponentFixture<GroupeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
