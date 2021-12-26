import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodMenuOptionsComponent } from './food-menu-options.component'

describe('FoodMenuOptionComponent', () => {
  let component: FoodMenuOptionsComponent
  let fixture: ComponentFixture<FoodMenuOptionsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodMenuOptionsComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodMenuOptionsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
