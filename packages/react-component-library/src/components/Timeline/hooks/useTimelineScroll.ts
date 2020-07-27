import { useEffect, useState } from 'react'

export function useTimelineScroll() {
  const [scrollY, setScrollY] = useState<number>(0)

  function handleScroll() {
    const newScrollY = window.scrollY

    setScrollY(newScrollY)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return {
    scrollY,
  }
}
