import React, { useRef, useState } from 'react'
import classNames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Bell, Logo as DefaultLogo, Search as SearchIcon } from '../../../icons'
import { LinkTypes } from '../../../common/Link'
import { MastheadUserProps } from './index'
import { Nav, NavItem } from '../../../common/Nav'
import {
  NOTIFICATION_CONTAINER_WIDTH,
  NotificationsProps,
} from '../NotificationPanel'
import { Searchbar } from '../Searchbar'
import { SHEET_PLACEMENT } from '../Sheet/constants'
import { Sheet } from '../Sheet/Sheet'
import { SheetButton } from '../Sheet/SheetButton'
import { useMastheadSearch } from './useMastheadSearch'

export interface MastheadProps {
  hasDefaultLogo?: boolean
  hasUnreadNotification?: boolean
  homeLink?: React.ReactElement<LinkTypes>
  Logo?: React.ComponentType
  nav?: React.ReactElement<Nav<NavItem>>
  notifications?: React.ReactElement<NotificationsProps>
  onSearch?: (term: string) => void
  searchPlaceholder?: string
  title: string
  user?: React.ReactElement<MastheadUserProps>
}

function getServiceName(
  homeLink: React.ReactElement<LinkTypes>,
  Logo: React.ComponentType,
  title: string
) {
  const link = homeLink || <span />

  return React.cloneElement(link as React.ReactElement, {
    ...link.props,
    children: (
      <>
        {Logo &&
          React.cloneElement(<Logo />, {
            role: 'presentation',
          })}
        <span className="rn-masthead__title" data-testid="masthead-servicename">
          {title}
        </span>
      </>
    ),
    className: classNames('rn-masthead__service-name', {
      'rn-masthead__service--has-logo': Logo,
    }),
  })
}

export const Masthead: React.FC<MastheadProps> = ({
  hasDefaultLogo = true,
  hasUnreadNotification,
  homeLink,
  Logo,
  nav,
  notifications,
  onSearch,
  searchPlaceholder = '',
  title,
  user,
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const searchButtonRef = useRef<HTMLButtonElement>(null)

  const {
    containerWidth,
    mastheadContainerRef,
    setShowSearch,
    showSearch,
    toggleSearch,
  } = useMastheadSearch()

  const DisplayLogo = Logo ?? (hasDefaultLogo ? DefaultLogo : null)

  const classes = classNames('rn-masthead', {
    'rn-masthead--show-search': showSearch,
    'rn-masthead--show-notifications': showNotifications,
  })

  const searchButtonClasses = classNames(
    'rn-masthead__option',
    'rn-searchbar__btn',
    {
      'is-active': showSearch,
      'is-inactive': !showSearch,
    }
  )

  const submitSearch = (term: string) => {
    onSearch(term)
    setShowSearch(false)
  }

  return (
    <div className={classes} data-testid="masthead" ref={mastheadContainerRef}>
      <div className="rn-masthead__main">
        <div data-testid="masthead-banner" role="banner">
          {getServiceName(homeLink, DisplayLogo, title)}
        </div>

        <div className="rn-masthead__options">
          {onSearch && (
            <>
              <button
                aria-expanded={showSearch}
                aria-label="Show search"
                className={searchButtonClasses}
                onClick={toggleSearch}
                ref={searchButtonRef}
                data-testid="masthead-search-button"
              >
                <SearchIcon />
              </button>
              <svg className="rn-masthead__vertical-separator">
                <line x1="0" y1="14" x2="0" y2="44" />
              </svg>
            </>
          )}

          {notifications && (
            <Sheet
              button={(
                <SheetButton
                  aria-label="Show notifications"
                  className="rn-masthead__option"
                  data-testid="notification-button"
                  icon={<Bell />}
                >
                  {hasUnreadNotification && (
                    <span
                      className="rn-notification-panel__not-read"
                      data-testid="not-read"
                    />
                  )}
                </SheetButton>
              )}
              className="rn-masthead__notification"
              placement={SHEET_PLACEMENT.BELOW}
              width={NOTIFICATION_CONTAINER_WIDTH}
              onHide={() => setShowNotifications(false)}
              onShow={() => setShowNotifications(true)}
            >
              {notifications}
            </Sheet>
          )}

          {user}
        </div>
      </div>

      <TransitionGroup>
        {onSearch && showSearch && (
          <CSSTransition
            classNames="rn-searchbar"
            timeout={{ enter: 300, exit: 300 }}
          >
            <Searchbar
              onSearch={submitSearch}
              searchButton={searchButtonRef}
              searchPlaceholder={searchPlaceholder}
              setShowSearch={setShowSearch}
              style={{ width: containerWidth }}
            />
          </CSSTransition>
        )}
      </TransitionGroup>

      {nav}
    </div>
  )
}

Masthead.displayName = 'Masthead'
