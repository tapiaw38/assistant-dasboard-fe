import dayjs from 'dayjs'

export const useDateFormat = () => {
  const dateFormat = (date: string) => {
    return dayjs(date).format('DD/MM/YYYY')
  }

  return {
    dateFormat,
  }
}
