module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    {
      name: "@storybook/addon-essentials",
      options: {
        docs: false,
      }
    },
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    "@storybook/addon-a11y"
  ],
  "framework": "@storybook/angular",
  "core": {
    "builder": "webpack5"
  }
}
