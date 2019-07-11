import React, { Component } from 'react'
import { Link } from '../../index'

interface NavItem {
  [propName: string]: string | number
  id: number
  url: string
  text: string
}

export type NavList = readonly NavItem[]

class TopBar extends Component<{ navList: NavList }, {}> {
  public static defaultProps = {
    navList: []
  }

  public render(): React.ReactNode {
    const { navList } = this.props

    return (
      <div className="top-bar container">
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
