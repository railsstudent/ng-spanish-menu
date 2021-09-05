import { setCompodocJson } from '@storybook/addon-docs/angular'
import docJson from '../documentation.json'
// import { addDecorator } from '@storybook/react'
// import { initializeWorker, mswDecorator } from 'msw-storybook-addon'

setCompodocJson(docJson)
// initializeWorker()
// addDecorator(mswDecorator)

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: { inlineStories: true },
}
