import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { environment } from 'src/environments/environment'

import { Choice, OrderedFoodChoice, SimpleChangeQuantityMap } from '../interfaces'

function isQtyMapCurrentValueObjectLiteral(qtyMap: SimpleChange): qtyMap is SimpleChangeQuantityMap {
  return (
    qtyMap !== undefined &&
    typeof qtyMap.firstChange === 'boolean' &&
    qtyMap.currentValue !== undefined &&
    typeof qtyMap.currentValue === 'object' &&
    !(qtyMap.currentValue instanceof Array)
  )
}
@Component({
  selector: 'app-food-choice',
  templateUrl: './food-choice.component.html',
  styleUrls: ['./food-choice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodChoiceComponent implements OnInit, OnChanges, OnDestroy {
  // #region Properties (8)

  @Input()
  public choice: Choice
  @Output()
  public foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true })
  public iconContainer: ViewContainerRef
  @Input()
  public qtyMap: Record<string, number> | undefined | null
  public remained: number
  public componentRefs: ComponentRef<unknown>[] = []
  public minimumSupply: number

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const { qtyMap } = changes
    if (isQtyMapCurrentValueObjectLiteral(qtyMap)) {
      this.remained = qtyMap.currentValue[this.choice.id]
    } else {
      this.remained = 0
    }

    await this.handleLowSupply()
  }

  public ngOnDestroy(): void {
    this.destroyComponents()
  }

  public async ngOnInit(): Promise<void> {
    this.remained = this.qtyMap ? this.qtyMap[this.choice.id] || 0 : 0
    this.minimumSupply = Math.ceil(this.remained * environment.lowSupplyPercentage)

    await this.handleLowSupply()
  }

  public submitFoodChoice(newQuantity: number): void {
    const { ingredients, quantity, ...rest } = this.choice
    if (this.remained - newQuantity >= 0) {
      this.foodChoiceAdded.emit({
        ...rest,
        quantity: newQuantity,
      })
    }
  }

  // #endregion Public Methods (4)

  // #region Private Methods (3)

  private destroyComponents() {
    for (const componentRef of this.componentRefs) {
      componentRef.destroy()
    }
    if (this.iconContainer) {
      this.iconContainer.clear()
    }
  }

  private async displayLowSupplyIcon() {
    if (this.componentRefs && this.componentRefs.length <= 0) {
      const faExclamationTriangle = (await import('@fortawesome/free-solid-svg-icons')).faExclamationTriangle
      const FaIconComponent = (await import('@fortawesome/angular-fontawesome')).FaIconComponent
      const resolvedFaIconComponent = this.componentFactoryResolver.resolveComponentFactory(FaIconComponent)
      const faIconComponentRef = this.iconContainer.createComponent(resolvedFaIconComponent)
      faIconComponentRef.instance.icon = faExclamationTriangle
      faIconComponentRef.instance.classes = ['text-red-500', 'text-[1.35rem]', 'mr-2']
      faIconComponentRef.instance.render()
      this.componentRefs.push(faIconComponentRef)
      this.cdr.detectChanges()
    }
  }

  private async handleLowSupply() {
    if (this.remained <= 0) {
      this.destroyComponents()
    } else if (this.remained > 0 && this.remained <= this.minimumSupply) {
      await this.displayLowSupplyIcon()
    }
  }

  // #endregion Private Methods (3)
}
