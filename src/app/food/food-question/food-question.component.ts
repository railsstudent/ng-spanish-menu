import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-food-question',
  template: `
    <div class="food-question flex flex-col border-2 border-indigo-400">
      <label name="question" class="item flex px-2 py-3">
        <span class="field">Question:</span>
        <span class="flex-auto field-text font-bold">{{ question }}</span>
      </label>
    </div>
  `,
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
