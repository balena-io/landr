import React from 'react'
import _ from 'lodash'
import {
  Provider
} from 'rendition'
import {
  storiesOf
} from '@storybook/react'

import routes from '../lib/routes'
import allComponents from '../lib/components'
import {
  theme as renditionTheme
} from '../lib/renderer'
import THEME from '../default-theme.json'
import CONTRACT from '../meta.json'

const ROUTES = routes(CONTRACT)
const components = _.omit(allComponents, 'Head')

// TODO: filter out the invalid combinations

for (const route of ROUTES) {
  for (const [ name, definition ] of Object.entries(components)) {
    const variants = definition.variants(
      CONTRACT,
      route.context,
      route,
      ROUTES,
      {
        theme: THEME
      }
    )

    variants.forEach((variant, index) => {
      const element = definition.render(variant)
      let storyTitle = `${route.path.join('/')}` || 'Home'

      // Dots in path don't play nice with storybook categories, replacing with underscores
      if (route.context.version) {
        storyTitle = storyTitle.split('.').join('_')
      }

      storyTitle += `/${name}`

      storyTitle = _.upperFirst(storyTitle)
      storiesOf(storyTitle, module).add(`Variant ${index + 1}`, () => {
        return (
          <Provider theme={renditionTheme}>{element}</Provider>
        )
      })
    })
  }
}
