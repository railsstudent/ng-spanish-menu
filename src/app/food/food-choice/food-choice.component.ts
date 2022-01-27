import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { environment } from 'src/environments/environment'

import { Choice, OrderedFoodChoice, Stock } from '../interfaces'
import { isQtyMapCurrentValueObjectLiteral } from './food-choice.type-guard'

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
  public viewContainerRef: ViewContainerRef
  @ViewChild('lowSupplyRef', { read: ElementRef, static: true })
  public lowSupplierRef: ElementRef
  @Input()
  public qtyMap: Record<string, Stock> | undefined | null
  public remained: number
  public stock: number
  public componentRef: ComponentRef<unknown> | null = null
  public minimumSupply: number

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor(
    private factoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
  ) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const { qtyMap } = changes
    if (isQtyMapCurrentValueObjectLiteral(qtyMap)) {
      this.remained = qtyMap.currentValue[this.choice.id].quantity || 0
    } else {
      this.remained = 0
    }

    await this.handleLowSupply()
  }

  public ngOnDestroy(): void {
    this.destroyComponents()
  }

  public async ngOnInit(): Promise<void> {
    if (this.qtyMap) {
      this.remained = this.qtyMap[this.choice.id].quantity || 0
      this.stock = this.qtyMap[this.choice.id].totalStock || 0
      this.minimumSupply = Math.ceil(this.stock * environment.lowSupplyPercentage)
    } else {
      this.remained = 0
      this.stock = 0
      this.minimumSupply = 0
    }

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
    if (this.componentRef) {
      this.componentRef.destroy()
    }

    if (this.viewContainerRef) {
      this.viewContainerRef.clear()
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    Array.from(this.lowSupplierRef.nativeElement.children).forEach((child) => {
      this.renderer.removeChild(this.lowSupplierRef.nativeElement, child)
    })
  }

  private async displayLowSupplyComponent() {
    if (!this.componentRef) {
      const textColor = 'text-red-500'
      await this.displayLowSupplyIcon(textColor)

      this.renderLowSupplyText(textColor)
      this.cdr.detectChanges()
    }
  }

  private async displayLowSupplyIcon(textColor: string) {
    const faExclamationTriangle = (await import('@fortawesome/free-solid-svg-icons')).faExclamationTriangle
    const FaIconComponent = (await import('@fortawesome/angular-fontawesome')).FaIconComponent
    const resolvedFaIconComponent = this.factoryResolver.resolveComponentFactory(FaIconComponent)
    const faIconComponentRef = this.viewContainerRef.createComponent(resolvedFaIconComponent)
    faIconComponentRef.instance.icon = faExclamationTriangle
    faIconComponentRef.instance.classes = [textColor, 'text-[1.35rem]', 'mr-2']
    faIconComponentRef.instance.render()
    this.componentRef = faIconComponentRef
  }

  private renderLowSupplyText(textColor: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const lowSupplySpanElement = this.renderer.createElement('span') as HTMLSpanElement
    lowSupplySpanElement.classList.add(textColor, 'text-xl')
    lowSupplySpanElement.innerText = 'Low Supply'
    this.renderer.appendChild(this.lowSupplierRef.nativeElement, lowSupplySpanElement)
  }

  private async handleLowSupply() {
    if (this.remained <= 0) {
      this.destroyComponents()
    } else if (this.remained > 0 && this.remained <= this.minimumSupply) {
      await this.displayLowSupplyComponent()
    }
  }

  // #endregion Private Methods (3)
}
