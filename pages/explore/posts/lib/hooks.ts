import { layoutBottomNavbarAtoms } from '@/store/atoms'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'

export const useExplorePostsPage = () => {
  const setBottomNavbarActiveItem = useSetRecoilState(layoutBottomNavbarAtoms.activeItem)

  const onMount = () => {
    setBottomNavbarActiveItem('explore')
  }

  useEffect(onMount, [])

  return {}
}
