import React from 'react'

import { Button } from '../Button'
import { TimelineContext, TimelineProvider } from './context'
import { TIMELINE_ACTIONS } from './context/types'
import { RangeSlider } from '../RangeSlider'

export const TimelineScaling: React.FC = ({}) => {
  return (
    <TimelineContext.Consumer>
      {({
        dispatch,
        state: {
          options: { scaleIndex },
        },
      }) => (
        <>
          <div>
            <RangeSlider
              domain={[0, 8]}
              mode={1}
              step={1}
              values={[scaleIndex]}
              onChange={(values) => {
                dispatch({ type: TIMELINE_ACTIONS.SCALE, scaleIndex: values[0] })
              }}
              tracksLeft
            />
          </div>
          {/*<div>*/}
          {/*  <Button*/}
          {/*    onClick={() => {*/}
          {/*      console.log('zoom out')*/}

          {/*      dispatch({ type: TIMELINE_ACTIONS.ZOOM_OUT })*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    Out*/}
          {/*  </Button>*/}
          {/*  <Button*/}
          {/*    onClick={() => {*/}
          {/*      console.log('zoom in')*/}

          {/*      dispatch({ type: TIMELINE_ACTIONS.ZOOM_IN })*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    In*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </>
      )}
    </TimelineContext.Consumer>
  )
}
