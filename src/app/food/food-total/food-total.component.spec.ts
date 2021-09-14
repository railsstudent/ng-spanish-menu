import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodTotalComponent } from './food-total.component';

describe('FoodTotalComponent', () => {
  let component: FoodTotalComponent;
  let fixture: ComponentFixture<FoodTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoodTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
