import * as React from 'react'

import { Snippet } from '!/playroom/src/types'
import { DoubleCTA } from './DoubleCTA'
import { Typography } from '../..'

export const snippets: Snippet[] = [
  {
    name: 'Basic',
    code: (
      <DoubleCTA padding="4">
        <Typography>This is a modal popup.</Typography>
      </DoubleCTA>
    ),
  },
]
