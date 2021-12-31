import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
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
import { delay, map, takeUntil, tap } from 'rxjs/operators'

import { Choice } from '../interfaces'
import { FoodService } from '../services'
import { fulfillOrderValidator } from '../validators'

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
  // #region Properties (6)

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

  // #endregion Properties (6)

  // #region Constructors (1)

  constructor(
    private fb: FormBuilder,
    private foodService: FoodService,
    private factoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
  ) {}

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get quantity(): FormControl | undefined {
    if (!this.form) {
      return undefined
    }
    return this.form.get('quantity') as FormControl
  }

  public get quantityRemained(): number {
    return this.foodService.getQuantity(this.choice.id)
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (2)

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

    this.submitChoice$
      .pipe(
        tap(($event) => {
          $event.preventDefault()
          $event.stopPropagation()
          this.processing = true
          this.displaySpinnerIcon()
        }),
        delay(1500),
        map(() => this.form.value as { quantity: number }),
        map(({ quantity }) => +quantity),
        tap(() => {
          this.destroyComponents()
          this.processing = false
        }),
        takeUntil(this.unsubscribe$),
      )
      .subscribe((quantity) => this.foodChoiceSubmitted.emit(quantity))
  }

  // #endregion Public Methods (2)

  private async displaySpinnerIcon() {
    const faSpinner = (await import('@fortawesome/free-solid-svg-icons')).faSpinner
    const FaIconComponent = (await import('@fortawesome/angular-fontawesome')).FaIconComponent
    const resolvedFaIconComponent = this.factoryResolver.resolveComponentFactory(FaIconComponent)
    const faIconComponentRef = this.viewContainerRef.createComponent(resolvedFaIconComponent)
    faIconComponentRef.instance.icon = faSpinner
    faIconComponentRef.instance.pulse = true
    faIconComponentRef.instance.render()
    this.componentRef = faIconComponentRef
    this.cdr.detectChanges()
  }

  private destroyComponents() {
    if (this.componentRef) {
      this.componentRef.destroy()
    }

    if (this.viewContainerRef) {
      this.viewContainerRef.clear()
    }
  }
}
