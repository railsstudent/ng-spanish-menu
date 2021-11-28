import { angular } from '@betterer/angular'
import { eslint } from '@betterer/eslint'

export default {
  'stricter template compilation': () =>
    angular('./tsconfig.json', {
      strictTemplates: true,
    }).include('src/**/*.ts', 'src/**/*.html'),
}
