import { angular } from '@betterer/angular'
import { eslint } from '@betterer/eslint'

export default {
  'no more await in loop': () => eslint({ 'no-await-in-loop': 'error' }).include('src/**/*.ts'),
  'stricter template compilation': () =>
    angular('./tsconfig.json', {
      strictTemplates: true,
    }).include('src/**/*.ts', 'src/**/*.html'),
  'no more eslint-disable': () => eslint({ 'eslint-comments/no-use': 'error' }).include('src/**/*.ts'),
}
