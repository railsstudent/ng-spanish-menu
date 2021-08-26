import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodQuestionComponent } from './food-question.component'

describe('FoodQuestionComponent', () => {
  let component: FoodQuestionComponent
  let fixture: ComponentFixture<FoodQuestionComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodQuestionComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodQuestionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
