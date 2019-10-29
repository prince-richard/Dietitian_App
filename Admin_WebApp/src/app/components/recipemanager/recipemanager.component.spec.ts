import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipemanagerComponent } from './recipemanager.component';

describe('RecipemanagerComponent', () => {
  let component: RecipemanagerComponent;
  let fixture: ComponentFixture<RecipemanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipemanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipemanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
