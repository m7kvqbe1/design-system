import React, { useRef } from 'react'

import { useTimelineRowHeader } from './hooks/useTimelineRowHeader'

interface TimelineHeaderRowProps extends ComponentWithClass {
  children: React.ReactElement<TimelineHeaderRowProps>
  hasSide: boolean
  scrollY: number
  style: any // todo
  title?: string
}

export const TimelineHeaderRow: React.FC<TimelineHeaderRowProps> = ({
  children,
  hasSide,
  scrollY,
  style,
  title,
}) => {
  const { rowHeaderRef, top } = useTimelineRowHeader(hasSide, scrollY)

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
            backgroundColor: 'white',
            zIndex: 1000,
            justifyContent: 'flex-end',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px',
            fontSize: '10px',
            ...style,
          }}
        >
          {title}
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
        {children}
      </div>
    </div>
  )
}

TimelineHeaderRow.displayName = 'TimelineHeaderRow'
