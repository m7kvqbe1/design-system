import React from 'react'

import { TimelineProvider } from './context'
import { TimelineComponent } from './types'
import { useTimelineScroll } from './hooks/useTimelineScroll'

import {
  TimelineDays,
  TimelineDaysProps,
  TimelineMonths,
  TimelineMonthsProps,
  TimelineRows,
  TimelineRowsProps,
  TimelineSide,
  TimelineSideProps,
  TimelineTodayMarker,
  TimelineTodayMarkerProps,
  TimelineWeeks,
  TimelineWeeksProps,
} from '.'

import { TimelineOptions } from './context/types'
import { DEFAULTS } from './constants'

type timelineRootChildrenType = React.ReactElement<TimelineSideProps>

type timelineHeadChildrenType =
  | React.ReactElement<TimelineTodayMarkerProps>
  | React.ReactElement<TimelineMonthsProps>
  | React.ReactElement<TimelineWeeksProps>
  | React.ReactElement<TimelineDaysProps>

type timelineBodyChildrenType = React.ReactElement<TimelineRowsProps>

type timelineChildrenType =
  | timelineRootChildrenType
  | timelineHeadChildrenType
  | timelineBodyChildrenType

export interface TimelineProps extends ComponentWithClass {
  children: timelineChildrenType | timelineChildrenType[]
  dayWidth?: number
  hasSide?: boolean
  startDate?: Date
  endDate?: Date
  today?: Date
  range?: number
}

function isComponentOf<T extends TimelineComponent>(
  item: T,
  names: string[]
): item is T {
  const typeName: string | null = (item as T)?.type?.name

  return names.includes(typeName)
}

function extractChildren(
  children: timelineChildrenType | timelineChildrenType[],
  names: string[],
  inverse?: boolean
) {
  return (children as []).filter((child) => {
    return inverse ? !isComponentOf(child, names) : isComponentOf(child, names)
  })
}

function mapChildren(
  children: React.ReactElement | React.ReactElement[],
  hasSide: boolean,
  scrollY: number
) {
  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      hasSide,
      scrollY,
    })
  })
}

export const Timeline: React.FC<TimelineProps> = ({
  children,
  dayWidth = DEFAULTS.DAY_WIDTH,
  startDate,
  endDate,
  today,
  range,
}) => {
  const options: TimelineOptions = {
    dayWidth,
    rangeInMonths: range || DEFAULTS.RANGE_IN_MONTHS,
  }

  const { scrollY } = useTimelineScroll()

  const sideChildren = extractChildren(children, [TimelineSide.name])

  const headChildren = extractChildren(children, [
    TimelineDays.name,
    TimelineWeeks.name,
    TimelineMonths.name,
    TimelineTodayMarker.name,
  ])

  const bodyChildren = extractChildren(children, [TimelineRows.name])

  return (
    <TimelineProvider
      startDate={startDate}
      endDate={endDate}
      today={today}
      options={options}
    >
      <div className="timeline" style={{ display: 'block' }} role="grid">
        {mapChildren(headChildren, sideChildren.length > 0, scrollY)}
        {React.Children.map(
          bodyChildren,
          (bodyChild: React.ReactElement<TimelineRowsProps>) => {
            return React.cloneElement(bodyChild, {
              children: mapChildren(
                bodyChild.props.children,
                sideChildren.length > 0,
                scrollY
              ),
            })
          }
        )}
      </div>
    </TimelineProvider>
  )
}

Timeline.displayName = 'Timeline'
