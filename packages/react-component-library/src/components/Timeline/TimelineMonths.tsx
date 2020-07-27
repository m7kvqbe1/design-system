import React from 'react'

import { TimelineContext } from './context'
import { TimelineMonth } from './TimelineMonth'
import { TimelineHeaderRow } from './TimelineHeaderRow'

export interface TimelineMonthsWithRenderContentProps
  extends ComponentWithClass {
  hasSide?: boolean
  render: (
    index: number,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => React.ReactElement
  scrollY?: number
}

export interface TimelineMonthsWithChildrenProps extends ComponentWithClass {
  hasSide?: boolean
  render?: never
  scrollY?: number
}

export type TimelineMonthsProps =
  | TimelineMonthsWithRenderContentProps
  | TimelineMonthsWithChildrenProps

export const TimelineMonths: React.FC<TimelineMonthsProps> = ({
  hasSide,
  render,
  scrollY,
}) => {
  return (
    <TimelineContext.Consumer>
      {({
        state: {
          days,
          months,
          options: { dayWidth },
        },
      }) => (
        <TimelineHeaderRow
          hasSide={hasSide}
          scrollY={scrollY}
          style={{ height: '4rem', backgroundColor: 'lightgrey' }}
          title="Months"
        >
          <div className="timeline__weeks" data-testid="timeline-weeks">
            {months.map(({ startDate }, index) => (
              <TimelineMonth
                days={days}
                dayWidth={dayWidth}
                index={index}
                render={render}
                startDate={startDate}
              />
            ))}
          </div>
        </TimelineHeaderRow>
      )}
    </TimelineContext.Consumer>
  )
}

TimelineMonths.displayName = 'TimelineMonths'
