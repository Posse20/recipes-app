import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFridge } from './my-fridge';

describe('MyFridge', () => {
  let component: MyFridge;
  let fixture: ComponentFixture<MyFridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFridge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyFridge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
