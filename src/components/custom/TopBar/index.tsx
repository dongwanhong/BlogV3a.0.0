import React, { Component } from 'react'
import { Link } from '../../index'

interface NavItem {
  [propName: string]: string | number
  id: number
  url: string
  text: string
}

export type NavList = readonly NavItem[]

interface Props {
  navList?: NavList
}

class TopBar extends Component<Props, {}> {
  public static navList: NavList = [
    {
      id: 1,
      url: 'https://github.com/dongwanhong',
      text: 'Github'
    },
    {
      id: 2,
      url: '/',
      text: '项目演示'
    },
    {
      id: 3,
      url: '/',
      text: '博文'
    },
    {
      id: 4,
      url: 'https://dongwanhong.github.io/notebook/',
      text: '笔记'
    },
    {
      id: 5,
      url: '/',
      text: '关于我'
    },
    {
      id: 6,
      url: '/',
      text: '设置'
    }
  ]

  public render(): React.ReactNode {
    let { navList } = this.props
    if (!navList) {
      navList = TopBar.navList
    }

    return (
      <div className="top-bar">
        <Link to="/" className="title">
          码良的博客
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

export default TopBar
