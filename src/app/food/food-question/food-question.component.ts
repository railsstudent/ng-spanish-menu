import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-food-question',
  templateUrl: './food-question.component.html',
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodQuestionComponent {
  // #region Properties (1)

  @Input()
  public question: string

  // #endregion Properties (1)
}
