import { angular } from '@betterer/angular'
import { BettererFileTest } from '@betterer/betterer'

export default {
  'stricter template compilation': (): BettererFileTest =>
    angular('./tsconfig.json', { strictTemplates: true }).include('src/**/*.ts', 'src/**/*.html'),
}
