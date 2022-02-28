import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Subject } from 'rxjs'
import { delay, map, switchMap, takeUntil, tap } from 'rxjs/operators'

import { Choice } from '../interfaces'
import { FoodService } from '../services'
import { fulfillOrderValidator } from '../validators'
import { isFormValueQuantity } from './food-choice-form.type-guard'

@Component({
  selector: 'app-food-choice-form',
  templateUrl: './food-choice-form.component.html',
  styles: [
    `
      :host {
        display: block;
      }

      .ng-invalid:not(form) {
        border-left: 5px solid #a94442;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceFormComponent implements OnInit, OnDestroy {
  @Input()
  public choice: Choice
  @Output()
  public foodChoiceSubmitted = new EventEmitter<number>()
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef
  public form: FormGroup
  public processing = false
  componentRef: ComponentRef<unknown> | null = null
  submitChoice$ = new Subject<Event>()
  unsubscribe$ = new Subject<boolean>()

  constructor(private fb: FormBuilder, private foodService: FoodService, private cdr: ChangeDetectorRef) {}

  public get quantity(): FormControl | undefined {
    if (!this.form) {
      return undefined
    }
    return this.form.get('quantity') as FormControl
  }

  public get quantityRemained(): number {
    return this.foodService.getQuantity(this.choice.id)
  }

  public ngOnDestroy(): void {
    this.destroyComponents()

    this.unsubscribe$.next(true)
    this.unsubscribe$.complete()
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      quantity: new FormControl(1, {
        validators: [Validators.required, Validators.min(1), fulfillOrderValidator(this.choice.id, this.foodService)],
        updateOn: 'blur',
      }),
    })

    const delayTime = 1000
    this.submitChoice$
      .pipe(
        switchMap(($event) => {
          $event.preventDefault()
          $event.stopPropagation()
          this.processing = true
          return this.displaySpinnerIcon()
        }),
        delay(delayTime),
        map(() => (isFormValueQuantity(this.form) ? this.form.value.quantity : 0)),
        tap(() => {
          this.destroyComponents()
          this.processing = false
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((quantity) => this.foodChoiceSubmitted.emit(quantity))
  }

  private async displaySpinnerIcon(): Promise<void> {
    const { faSpinner } = await import('@fortawesome/free-solid-svg-icons')
    const FaIconComponent = (await import('@fortawesome/angular-fontawesome')).FaIconComponent
    const faIconComponentRef = this.viewContainerRef.createComponent(FaIconComponent)
    faIconComponentRef.instance.icon = faSpinner
    faIconComponentRef.instance.pulse = true
    faIconComponentRef.instance.render()
    this.componentRef = faIconComponentRef
    this.cdr.detectChanges()
  }

  private destroyComponents(): void {
    if (this.componentRef) {
      this.componentRef.destroy()
    }

    if (this.viewContainerRef) {
      this.viewContainerRef.clear()
    }
  }
}
