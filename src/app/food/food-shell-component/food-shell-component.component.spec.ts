import { ComponentFixture, TestBed } from '@angular/core/testing'

import { FoodShellComponentComponent } from './food-shell-component.component'

describe('FoodShellComponentComponent', () => {
  let component: FoodShellComponentComponent
  let fixture: ComponentFixture<FoodShellComponentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodShellComponentComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(FoodShellComponentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
