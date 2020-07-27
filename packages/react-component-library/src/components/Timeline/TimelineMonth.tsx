import React from 'react'
import { format, endOfMonth, differenceInDays, min, max } from 'date-fns'
import classNames from 'classnames'

import { formatPx } from './helpers'
import { withKey } from '../../helpers'
import { DATE_MONTH_FORMAT } from './constants'
import { TimelineDay } from './context/types'

interface TimelineMonthProps {
  days: TimelineDay[]
  dayWidth: number
  index: number
  render: (
    index: number,
    dayWidth: number,
    daysTotal: number,
    startDate: Date
  ) => React.ReactElement
  startDate: Date
}

function renderDefault(
  index: number,
  dayWidth: number,
  daysTotal: number,
  startDate: Date
): React.ReactElement {
  const wrapperClasses = classNames(
    'timeline__month',
    'timeline__month--renderDefault'
  )

  const titleClasses = classNames(
    'timeline__month-title',
    'timeline__month-title--renderDefault'
  )

  return (
    <div
      className={wrapperClasses}
      style={{
        width: formatPx(dayWidth, daysTotal),
      }}
      data-testid="timeline-month"
    >
      <span className={titleClasses}>
        {format(startDate, DATE_MONTH_FORMAT)}
      </span>
    </div>
  )
}

export const TimelineMonth: React.FC<TimelineMonthProps> = ({
  days,
  dayWidth,
  index,
  render,
  startDate,
}) => {
  const firstDateDisplayed = max([startDate, days[0].date])
  const lastDateDisplayed = min([
    endOfMonth(startDate),
    days[days.length - 1].date,
  ])
  const daysTotal = differenceInDays(lastDateDisplayed, firstDateDisplayed) + 1

  const child = render
    ? render(index, dayWidth, daysTotal, startDate)
    : renderDefault(index, dayWidth, daysTotal, startDate)

  return withKey(child, 'timeline-month', startDate.toString())
}

TimelineMonth.displayName = 'TimelineMonth'
