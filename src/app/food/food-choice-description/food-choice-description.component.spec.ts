import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodChoiceDescriptionComponent } from './food-choice-description.component'

describe('FoodChoiceDescriptionComponent', () => {
  let component: FoodChoiceDescriptionComponent
  let fixture: ComponentFixture<FoodChoiceDescriptionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodChoiceDescriptionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodChoiceDescriptionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
