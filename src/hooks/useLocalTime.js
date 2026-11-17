import { useEffect, useState } from 'react'

const formatter = new window.Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kathmandu',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const now = () => formatter.format(new Date())

// Jeeni's local time (Asia/Kathmandu, 24h) as "HH:MM", refreshed on the
// minute so the board reads like a live departures display.
export function useLocalTime() {
  const [time, setTime] = useState(now)

  useEffect(() => {
    let timer = 0
    const schedule = () => {
      const ms = 60000 - (Date.now() % 60000) + 50
      timer = setTimeout(() => {
        setTime(now())
        schedule()
      }, ms)
    }
    schedule()
    return () => clearTimeout(timer)
  }, [])

  return time
}
