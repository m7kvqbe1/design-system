import React from 'react'
import classNames from 'classnames'

import { TimelineContext } from './context'
import { TimelineDay } from './TimelineDay'
import { TimelineHeaderRow } from './TimelineHeaderRow'

export interface TimelineDaysWithRenderContentProps {
  hasSide?: boolean
  render: (index: number, dayWidth: number, date: Date) => React.ReactElement
  scrollY?: number
}

export interface TimelineDaysWithChildrenProps {
  hasSide?: boolean
  render?: never
  scrollY?: number
}

export type TimelineDaysProps =
  | TimelineDaysWithRenderContentProps
  | TimelineDaysWithChildrenProps

export const TimelineDays: React.FC<TimelineDaysProps> = ({
  hasSide,
  render,
  scrollY,
}) => {
  // todo: warn hasSide
  // todo: warn scrollY

  const classes = classNames('timeline__days', {
    'timeline__days--renderDefault': !render,
  })

  return (
    <TimelineContext.Consumer>
      {({
        state: {
          days,
          endDate: timelineEndDate,
          options: { dayWidth },
        },
      }) => (
        <TimelineHeaderRow
          hasSide={hasSide}
          scrollY={scrollY}
          style={{ height: '2.5rem', backgroundColor: 'lightcyan' }}
          title="Days"
        >
          <div className={classes} data-testid="timeline-days">
            {days &&
              days.map(({ date }, index) => (
                <TimelineDay
                  date={date}
                  dayWidth={dayWidth}
                  index={index}
                  render={render}
                  timelineEndDate={timelineEndDate}
                />
              ))}
          </div>
        </TimelineHeaderRow>
      )}
    </TimelineContext.Consumer>
  )
}

TimelineDays.displayName = 'TimelineDays'
