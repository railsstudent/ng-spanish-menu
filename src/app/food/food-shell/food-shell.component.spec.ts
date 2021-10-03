import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodShellComponent } from './food-shell.component'

describe('FoodShellComponentComponent', () => {
  let component: FoodShellComponent
  let fixture: ComponentFixture<FoodShellComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodShellComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodShellComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
