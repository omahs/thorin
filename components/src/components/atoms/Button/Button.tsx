import * as React from 'react'
import styled from 'styled-components'
import { ModifierKeys, applyStyleModifiers } from 'styled-components-modifiers'

import { ReactNodeNoStrings } from '../../../types'
import { Spinner } from '../Spinner'
//import { Typography } from '../Typography'
import { getCenterProps } from './utils'
import * as styles from './styles.css'

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
type NativeAnchorProps = React.AllHTMLAttributes<HTMLAnchorElement>

type BaseProps = {
  /** Centers text and reserves space for icon and spinner */
  center?: boolean
  children: NativeButtonProps['children']
  /** Marks as unusable */
  disabled?: boolean
  /** Adds ReactNode before children */
  prefix?: ReactNodeNoStrings
  /** Shows loading spinner inside button */
  loading?: boolean
  /** Constrains button to specific shape */
  shape?: styles.Shape
  /** Sets dimensions and layout  */
  size?: styles.Size
  /** Adds ReactNode after children */
  suffix?: ReactNodeNoStrings
  tabIndex?: NativeButtonProps['tabIndex']
  type?: NativeButtonProps['type']
  variant?: styles.Variant
  pressed?: boolean
  shadowless?: boolean
  onClick?: React.MouseEventHandler<HTMLElement> | undefined
}

type WithTone = {
  tone?: styles.Tone
  variant?: 'primary' | 'secondary'
}

type WithoutTone = {
  tone?: never
  variant?: styles.Variant
}

type WithAnchor = {
  as?: 'a'
  href?: string
  rel?: NativeAnchorProps['rel']
  target?: NativeAnchorProps['target']
}

type WithoutAnchor = {
  as?: 'button'
  href?: never
  rel?: never
  target?: never
}

export type Props = BaseProps &
  (WithTone | WithoutTone) &
  (WithAnchor | WithoutAnchor)

const BUTTON_MODIFIERS = {
  small: () => `
    font-size: 14px;
    padding: 10px 12px;
  `,
  medium: () => `
    font-size: 18px;
    padding: 15px 20px;
  `,
}

interface ModifierProps {
  modifiers?: ModifierKeys
}

const ButtonContainer = styled('button')<ModifierProps>`
  border-radius: 8px;
  border: none;
  font-size: 18px;
  ${({ theme: t }) => `
    color: ${t.primaryButton.text};
    background: ${t.primaryButton.background};
  `}

  padding: 15px 20px;
  ${applyStyleModifiers(BUTTON_MODIFIERS)}
`

export const Button = React.forwardRef(
  (
    {
      as = 'button',
      center,
      children,
      disabled,
      href,
      prefix,
      loading,
      shape,
      size = 'medium',
      suffix,
      // tone = 'accent',
      // type,
      // variant = 'primary',
      onClick,
    }: // pressed = false,
    // shadowless = false,
    Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    let childContent
    const labelContent = children
    //   <Typography color="inherit" ellipsis size="inherit" weight="semiBold">
    //     {children}
    //   </Typography>
    // )

    // let childContent: ReactNodeNoStrings
    if (shape) {
      childContent = loading ? <Spinner color="current" /> : labelContent
    } else {
      childContent = (
        <>
          {prefix && (
            <div {...getCenterProps(center, size, 'left')}>{prefix}</div>
          )}
          {labelContent}

          {(loading || suffix) && (
            <div {...getCenterProps(center, size, 'right')}>
              {loading ? <Spinner color="current" /> : suffix}
            </div>
          )}
        </>
      )
    }

    if (as == 'a') {
      return (
        <ButtonContainer as="a" href={href}>
          {childContent}
        </ButtonContainer>
      )
    }

    return (
      <ButtonContainer
        as="button"
        disabled={disabled}
        modifiers={[size]}
        ref={ref}
        type="button"
        onClick={onClick}
      >
        {childContent}
      </ButtonContainer>
    )
  },
)

Button.displayName = 'Button'
