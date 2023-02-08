import { format } from "date-fns"
import { IDate } from "../types/types"

export const formatDate = (date: IDate): string => {
  return format(new Date(date.seconds * 1000),  'PPPp')
}