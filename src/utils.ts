import moment from 'moment'

export const getDateAndTime = (dateStr: string): string => {
  const convertedToDate = Date.parse(dateStr)
  return moment(convertedToDate).format(' MMM D h:mm a')
}
