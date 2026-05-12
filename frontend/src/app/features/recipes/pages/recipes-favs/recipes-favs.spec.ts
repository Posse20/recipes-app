import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesFavs } from './recipes-favs';

describe('RecipesFavs', () => {
  let component: RecipesFavs;
  let fixture: ComponentFixture<RecipesFavs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesFavs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipesFavs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
