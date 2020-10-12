import { Dispatch } from 'react'

export type TimelineOptions = {
  dayWidth: number
  hoursBlockSize: number
  rangeInMonths: number
  unitWidth: number
  scaleIndex: number
}

export type TimelineDay = {
  dayIndex: number
  date: Date
}

export type TimelineHour = {
  hourIndex: number
  time: string
}

export type TimelineWeek = {
  weekIndex: number
  startDate: Date
}

export type TimelineMonth = {
  monthIndex: number
  startDate: Date
}

export type TimelineState = {
  today: Date
  startDate: null | Date
  endDate: null | Date
  months: TimelineMonth[]
  weeks: TimelineWeek[]
  days: TimelineDay[]
  hours: TimelineHour[]
  options: TimelineOptions
}

export const TIMELINE_ACTIONS = {
  GET_NEXT: 'GET_NEXT',
  GET_PREV: 'GET_PREV',
  SCALE: 'SCALE',
  ZOOM_IN: 'ZOOM_IN',
  ZOOM_OUT: 'ZOOM_OUT',
} as const

export type TimelineAction =
  | { type: typeof TIMELINE_ACTIONS.GET_NEXT }
  | { type: typeof TIMELINE_ACTIONS.GET_PREV }
  | { type: typeof TIMELINE_ACTIONS.SCALE, scaleIndex: number }
  | { type: typeof TIMELINE_ACTIONS.ZOOM_IN }
  | { type: typeof TIMELINE_ACTIONS.ZOOM_OUT }

export interface TimelineContextDefault {
  hasSide: boolean
  state: TimelineState
  dispatch: Dispatch<TimelineAction>
}

export interface TimelineProviderProps {
  children?: React.ReactNode
  hasSide?: boolean
  startDate?: Date
  endDate?: Date
  today?: Date
  options?: TimelineOptions
}
