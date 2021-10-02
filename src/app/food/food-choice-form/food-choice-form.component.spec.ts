import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodChoiceFormComponent } from './food-choice-form.component'

describe('FoodChoiceFormComponent', () => {
  let component: FoodChoiceFormComponent
  let fixture: ComponentFixture<FoodChoiceFormComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodChoiceFormComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodChoiceFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
