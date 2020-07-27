import React from 'react'
import classNames from 'classnames'

import { TimelineEventsProps } from '.'
import { useTimelineRowHeader } from './hooks/useTimelineRowHeader'

export interface TimelineRowProps extends ComponentWithClass {
  children:
    | React.ReactElement<TimelineEventsProps>
    | React.ReactElement<TimelineEventsProps>[]
  hasSide?: boolean
  name: string
  scrollY?: number
}

export const TimelineRow: React.FC<TimelineRowProps> = ({
  children,
  className,
  hasSide,
  name,
  scrollY,
}) => {
  const { rowHeaderRef, top } = useTimelineRowHeader(hasSide, scrollY)
  const classes = classNames('timeline__row', className)

  return (
    <div style={{ display: 'flex' }} role="row">
      {hasSide && (
        <div
          ref={rowHeaderRef}
          role="rowheader"
          style={{
            top,
            minWidth: '16rem',
            position: 'fixed', // todo: test ie + old chrome
            left: 0,
            backgroundColor: 'lightgreen',
            zIndex: 1000,
          }}
        >
          {name}
        </div>
      )}
      <div
        style={
          hasSide
            ? {
                marginLeft: '16rem',
              }
            : null
        }
      >
        <div className={classes} data-testid="timeline-row">
          {children}
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className={classes} data-testid="timeline-row">
  //     {children}
  //   </div>
  // )
}

TimelineRow.displayName = 'TimelineRow'
