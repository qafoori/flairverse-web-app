import { componentsAtoms } from '@/store/atoms'
import { Button } from 'antd'
import { FC } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { SlideUpAndDown } from '@/components/ui-kit/slide-up-and-down'
import * as Lib from '.'

export const FilterButton: FC<Lib.T.FilterButtonProps> = ({ filtersCount, filter }) => {
  const setFiltersVisibility = useSetRecoilState(componentsAtoms.pickUpFiltersVisibility(filter.storeKey))

  return (
    <Button type="primary" onClick={() => setFiltersVisibility(_ => !_)}>
      <span>Filters ({filtersCount})</span>
    </Button>
  )
}

export const FiltersBox: FC<Lib.T.FiltersBoxProps> = ({ filter }) => {
  const filtersVisibility = useRecoilValue(componentsAtoms.pickUpFiltersVisibility('COMPONENT_PICK_UP_FILTERS_VISIBILITY'))

  return (
    <SlideUpAndDown visible={filtersVisibility}>
      <div className="filterBox">{filter?.content}</div>
    </SlideUpAndDown>
  )
}

export const SearchBox: FC<Lib.T.SearchBoxProps> = ({ placeholder, searchBox }) => {
  const query = useRecoilValue(componentsAtoms.pickUpSearchQuery(searchBox.storeKey))
  const { handleOnInput } = Lib.H.useSearchBox({ searchBox })

  return <input type="text" value={query} onInput={handleOnInput} placeholder={placeholder || 'Search...'} autoFocus />
}
