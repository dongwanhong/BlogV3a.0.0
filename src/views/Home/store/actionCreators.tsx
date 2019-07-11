import { INIT_NAV_LIST } from './actionTypes'
import { NavList } from '../../../components/custom/TopBar'

export interface NavListAction {
  type: string
  navList: NavList
}

export const getInitNavList = (navList: NavList): NavListAction => ({
  type: INIT_NAV_LIST,
  navList
})
