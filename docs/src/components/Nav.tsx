import { useRouter } from 'next/dist/client/router'
import * as React from 'react'
import NextImage from 'next/image'

import { Box, Button, Stack, Typography } from '@ensdomains/thorin/components'

import { createGitHubLink } from '~/utils/github'
import { createPlayroomLink } from '~/utils/playroom'
import { useIsMounted } from '~/utils/isMounted'
import * as styles from '~/styles/utils.css'
import { Link } from './Link'
import { ThemeSwitcher } from './ThemeSwitcher'
import Logo from '~/assets/Logo.svg'

type Link = { name: string; route: string }

export type Props = {
  links: { name: string; links: Link[] }[]
}

type State = {
  open: boolean
}

const initialState = {
  open: false,
}

export const Nav = ({ links }: Props) => {
  const isMounted = useIsMounted()
  const router = useRouter()
  const [state, setState] = React.useState<State>(initialState)

  // Close menu on route change
  /* eslint-disable react-hooks/exhaustive-deps */
  React.useEffect(() => {
    const handleRouteChange = () => setState((x) => ({ ...x, open: false }))
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
  /* eslint-enable react-hooks/exhaustive-deps */

  return (
    <Box flexDirection="column" height="full">
      <Box paddingBottom={{ md: '5' }}>
        <Stack
          align={{ xs: 'center', md: 'flex-start' }}
          direction={{ xs: 'horizontal', md: 'vertical' }}
          justify={{ xs: 'space-between', md: 'flex-start' }}
          space="5"
        >
          <Stack align="center" direction="horizontal">
            <NavLink active={router.asPath === '/'} href="/">
              <Stack align="center" direction="horizontal">
                <NextImage height={64} src={Logo} width={64} />
              </Stack>
            </NavLink>

            <Box display={{ md: 'none' }}>
              <Button
                size="small"
                variant="transparent"
                onClick={() => setState((x) => ({ ...x, open: !x.open }))}
              >
                <Box aria-label={state.open ? 'Close menu' : 'Open menu'}>
                  Menu
                </Box>
              </Button>
            </Box>
          </Stack>

          <ThemeSwitcher />
        </Stack>
      </Box>

      <Box
        className={styles.list}
        display={{ xs: state.open ? 'block' : 'none', md: 'block' }}
        height="full"
        paddingBottom={{ md: '48' }}
        paddingTop={{ xs: '10', md: '5' }}
      >
        <Stack space="10">
          <Stack space="3">
            <NavLink href={createGitHubLink()}>GitHub</NavLink>
            <NavLink href={createPlayroomLink()}>Playroom</NavLink>
          </Stack>

          <Stack>
            <Typography variant="label">Guides</Typography>
            <Stack space="3">
              <NavLink href="/guides/development">Development</NavLink>
              <NavLink href="/guides/playroom">Playroom</NavLink>
            </Stack>
          </Stack>

          <Stack>
            <Typography variant="label">COMPONENTS</Typography>
            {links.map((x) => (
              <Stack key={x.name}>
                <Typography variant="label">{x.name}</Typography>

                <Stack space="3">
                  {x.links.map((y) => (
                    <NavLink
                      active={
                        isMounted && router.asPath.split('#')[0] === y.route
                      }
                      href={y.route}
                      key={y.route}
                    >
                      {y.name}
                    </NavLink>
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}

const NavLink = ({
  active,
  href,
  children,
}: React.PropsWithChildren<{
  active?: boolean
  href: string
}>) => {
  return (
    <Box width="max">
      <Link href={href}>
        <Typography
          color={active ? 'accent' : 'text'}
          weight={active ? 'medium' : 'normal'}
        >
          {children}
        </Typography>
      </Link>
    </Box>
  )
}
