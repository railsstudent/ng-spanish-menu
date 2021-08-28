import { ChangeDetectionStrategy, Component, Input } from '@angular/core'

@Component({
  selector: 'app-food-question',
  templateUrl: './food-question.component.html',
  styleUrls: ['./food-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FoodQuestionComponent {
  @Input()
  question: string
}
