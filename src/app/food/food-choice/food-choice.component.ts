import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
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
  @Input()
  public choice: Choice
  @Output()
  public foodChoiceAdded = new EventEmitter<OrderedFoodChoice>()
  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: false })
  public viewContainerRef: ViewContainerRef
  @ViewChild('lowSupplyRef', { read: ElementRef, static: false })
  public lowSupplierRef: ElementRef
  @Input()
  public qtyMap: Record<string, Stock> | undefined | null
  public remained: number
  public componentRef: ComponentRef<unknown> | null = null
  public minimumSupply: number

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

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
      const stock = this.qtyMap[this.choice.id].totalStock || 0
      this.minimumSupply = Math.ceil(stock * environment.lowSupplyPercentage)
    } else {
      this.remained = 0
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
        isLowSupply: this.isLowSupply(this.remained - newQuantity),
      })
    }
  }

  private destroyComponents() {
    if (this.componentRef) {
      this.componentRef.destroy()
    }

    if (this.viewContainerRef) {
      this.viewContainerRef.clear()
    }

    if (this.lowSupplierRef) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      Array.from(this.lowSupplierRef.nativeElement.children).forEach((child) => {
        this.renderer.removeChild(this.lowSupplierRef.nativeElement, child)
      })
    }
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
    const { faExclamationTriangle } = await import('@fortawesome/free-solid-svg-icons')
    const { FaIconComponent } = await import('@fortawesome/angular-fontawesome')
    const faIconComponentRef = this.viewContainerRef.createComponent(FaIconComponent)
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
    } else if (this.isLowSupply(this.remained)) {
      await this.displayLowSupplyComponent()
    }
  }

  private isLowSupply(remained: number): boolean {
    return remained > 0 && remained <= this.minimumSupply
  }
}
