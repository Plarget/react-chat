import {TGetDateFormatted} from "@/shared/utils/getDateFormatted/types.ts"

const getDateFormatted: TGetDateFormatted = (time) => {
  const date = new Date(time)
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  const now = new Date()
  const diffTime = Math.abs(Number(date) - Number(now))
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1
  const isTodaySMessage = diffDays === 0

  return isTodaySMessage ?
    `${hours}:${formattedMinutes}` :
    `${day} ${month} ${year}`
}

export default getDateFormatted