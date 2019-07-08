import React, { Component } from 'react'
import { Link } from '../../index'

interface NavItem {
  [propName: string]: string | number
  id: number
  url: string
  text: string
}

interface TopBarProps {
  readonly navInfo: NavItem[]
}

class TopBar extends Component<TopBarProps, {}> {
  public static defaultProps = {
    navInfo: [
      {
        id: 1,
        url: 'https://github.com/Anani1994',
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
        url: 'https://anani1994.github.io/notebook/',
        text: '笔记'
      },
      {
        id: 5,
        url: '/',
        text: '设置'
      }
    ]
  }

  public render(): React.ReactNode {
    const { navInfo } = this.props

    return (
      <div className="top-bar container">
        <Link to="/" className="title">
          码良的博客
        </Link>
        <div className="nav">
          {navInfo.map(item => (
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
