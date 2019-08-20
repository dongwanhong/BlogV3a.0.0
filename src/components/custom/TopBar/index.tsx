import React, { Component } from 'react'
import { Link } from '../../index'
import { injectIntl, WrappedComponentProps } from 'react-intl'

interface NavItem {
  [propName: string]: string | number
  id: number
  url: string
  text: string
}

export type NavList = readonly NavItem[]

interface Props extends WrappedComponentProps<'intl'> {
  navList?: NavList
}

class TopBar extends Component<Props, {}> {
  public render(): React.ReactNode {
    let { navList, intl } = this.props
    if (!navList) {
      navList = [
        {
          id: 1,
          url: 'https://github.com/dongwanhong',
          text: intl.formatMessage({ id: 'topbar.github' })
        },
        {
          id: 2,
          url: '/',
          text: intl.formatMessage({ id: 'topbar.project' })
        },
        {
          id: 3,
          url: '/article-list',
          text: intl.formatMessage({ id: 'topbar.article' })
        },
        {
          id: 4,
          url: 'https://dongwanhong.github.io/notebook/',
          text: intl.formatMessage({ id: 'topbar.note' })
        },
        {
          id: 5,
          url: '/',
          text: intl.formatMessage({ id: 'topbar.resume' })
        },
        {
          id: 6,
          url: '/',
          text: intl.formatMessage({ id: 'topbar.setting' })
        }
      ]
    }

    return (
      <div className="top-bar">
        <Link to="/" className="title">
          {intl.formatMessage({ id: 'topbar.main' })}
        </Link>
        <div className="nav">
          {navList.map(item => (
            <Link key={item.id} to={item.url} className="nav-item">
              {item.text}
            </Link>
          ))}
        </div>
      </div>
    )
  }
}

export default injectIntl(TopBar)
