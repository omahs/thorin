import * as React from 'react'

import { Card } from '../..'
import { Props as CardProps } from '../../atoms/Card/Card'
import { Button } from '../../atoms/Button'

type Props = {
  children: React.ReactNode
  backdropSurface?: React.ElementType
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
} & CardProps

export const DoubleCTA = ({
  children,
  onPrimaryClick,
  onSecondaryClick,
  ...cardProps
}: Props) => (
  <div onClick={onSecondaryClick}>
    <Card {...cardProps}>{children}</Card>
    {onPrimaryClick && <Button onClick={onPrimaryClick}>Hello</Button>}
  </div>
)
