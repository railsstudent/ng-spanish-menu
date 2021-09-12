import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodMenuCardComponent } from './food-menu-card.component'

describe('FoodMenuCardComponent', () => {
  let component: FoodMenuCardComponent
  let fixture: ComponentFixture<FoodMenuCardComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodMenuCardComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMenuCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
