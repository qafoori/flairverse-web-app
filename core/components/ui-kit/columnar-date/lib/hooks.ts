import * as Lib from '.'
import { NumeralMonth } from '@/helpers/dates/lib/types'
import { Dates } from '@/helpers/dates'

export const useColumnarDate = ({ dateTime }: Pick<Lib.T.ColumnarDateProps, 'dateTime'>) => {
  const separateDateTime = (): Lib.T.SeparatedDateTime => {
    const date = new Date(dateTime).toISOString().split('-')

    return {
      year: date[0],
      month: <string>Dates.getMonth(<NumeralMonth>parseInt(date[1])),
      day: date[2].split('T')[0].padStart(2, '0'),
    }
  }

  return {
    on: {
      separateDateTime,
    },
  }
}
