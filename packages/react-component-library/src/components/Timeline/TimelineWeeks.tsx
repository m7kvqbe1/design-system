import React from 'react'

import { TimelineContext } from './context'
import { TimelineWeek } from './TimelineWeek'
import { TimelineHeaderRow } from './TimelineHeaderRow'

export interface TimelineWeeksWithRenderContentProps
  extends ComponentWithClass {
  hasSide?: boolean
  render: (
    index: number,
    isOddNumber: boolean,
    offsetPx: string,
    widthPx: string,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => React.ReactElement
  scrollY?: number
}

export interface TimelineWeeksWithChildrenProps extends ComponentWithClass {
  hasSide?: boolean
  render?: never
  scrollY?: number
}

export type TimelineWeeksProps =
  | TimelineWeeksWithRenderContentProps
  | TimelineWeeksWithChildrenProps

export const TimelineWeeks: React.FC<TimelineWeeksProps> = ({
  hasSide,
  render,
  scrollY,
}) => {
  return (
    <TimelineContext.Consumer>
      {({
        state: {
          days,
          weeks,
          options: { dayWidth },
        },
      }) => (
        <TimelineHeaderRow
          hasSide={hasSide}
          scrollY={scrollY}
          style={{ height: '2.5rem', backgroundColor: 'lightblue' }}
          title="Weeks"
        >
          <div className="timeline__weeks" data-testid="timeline-weeks">
            {weeks.map(({ startDate }, index) => (
              <TimelineWeek
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

TimelineWeeks.displayName = 'TimelineWeeks'
