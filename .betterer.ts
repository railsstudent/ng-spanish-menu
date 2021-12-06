import { angular } from '@betterer/angular'
import { BettererFileTest } from '@betterer/betterer'
import { eslint } from '@betterer/eslint'

export default {
  'stricter template compilation': (): BettererFileTest =>
    angular('./tsconfig.json', { strictTemplates: true }).include('src/**/*.ts', 'src/**/*.html'),
  'typescript/eslint': (): BettererFileTest =>
    eslint({
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-for-in-array': 'error',
      'no-implied-eval': 'off',
      '@typescript-eslint/no-implied-eval': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-plus-operands': 'error',
      '@typescript-eslint/restrict-template-expressions': 'error',
      '@typescript-eslint/unbound-method': 'error',
    }).include('./src/**/*.ts'),
}
