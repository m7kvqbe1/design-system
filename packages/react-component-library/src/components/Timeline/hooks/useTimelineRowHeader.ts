import { isUndefined } from 'lodash'

import { useEffect, useRef, useState } from 'react'

export function useTimelineRowHeader(hasSide: boolean, scrollY = 0) {
  const rowHeaderRef = useRef<HTMLDivElement>()
  const [originalTop, setOriginalTop] = useState<number>(undefined)
  const [top, setTop] = useState<number>()

  function getOriginalTop() {
    if (!isUndefined(originalTop)) {
      return originalTop
    }

    const newOriginalTop = rowHeaderRef.current.offsetTop
    setOriginalTop(newOriginalTop)

    return newOriginalTop
  }

  useEffect(() => {
    if (hasSide) {
      const offset = getOriginalTop()
      const newTop = offset - scrollY
      setTop(newTop)
    }
  }, [scrollY])

  return {
    rowHeaderRef,
    top,
  }
}
