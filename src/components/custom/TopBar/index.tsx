import React, { Component } from 'react'
import { Link } from '../../index'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { CSSTransition } from 'react-transition-group'
import { Icon } from '@/components'

const isPhone = document.documentElement.clientWidth <= 1200

const classNames: CSSTransition.CSSTransitionClassNames = {
  enter: 'animated',
  enterActive: 'slideInLeft',
  exit: 'animated',
  exitActive: 'slideOutLeft'
}

interface NavItem {
  [propName: string]: string | number
  id: number
  url: string
  text: string
  icon: string
}

export type NavList = readonly NavItem[]

interface Props extends WrappedComponentProps<'intl'> {
  navList?: NavList
}

interface State {
  showNavList: boolean
}

class TopBar extends Component<Props, State> {
  public state: State = {
    showNavList: !isPhone
  }

  public constructor(props: Props) {
    super(props)
    this.toggleNav = this.toggleNav.bind(this)
  }

  private toggleNav(): void {
    const { showNavList } = this.state
    this.setState(() => ({ showNavList: !showNavList }))
  }

  public render(): React.ReactNode {
    const { toggleNav } = this
    const { showNavList } = this.state
    let { navList, intl } = this.props
    if (!navList) {
      navList = [
        {
          id: 1,
          url: 'https://github.com/dongwanhong',
          text: intl.formatMessage({ id: 'topbar.github' }),
          icon: 'icongithub'
        },
        {
          id: 2,
          url: '/',
          text: intl.formatMessage({ id: 'topbar.project' }),
          icon: 'iconrepo'
        },
        {
          id: 3,
          url: '/article-list',
          text: intl.formatMessage({ id: 'topbar.article' }),
          icon: 'iconbook'
        },
        {
          id: 4,
          url: 'https://dongwanhong.github.io/notebook/',
          text: intl.formatMessage({ id: 'topbar.note' }),
          icon: 'iconiconset0123'
        },
        {
          id: 5,
          url: '/',
          text: intl.formatMessage({ id: 'topbar.resume' }),
          icon: 'iconguanyuwomen'
        },
        {
          id: 6,
          url: '/',
          text: intl.formatMessage({ id: 'topbar.setting' }),
          icon: 'iconshezhi'
        }
      ]
    }

    return (
      <div className="top-bar">
        <Link to="/" className="title">
          <Icon icon="iconjiugongge" />
          {intl.formatMessage({ id: 'topbar.main' })}
        </Link>
        <div className="navbar-toggle" onClick={toggleNav}>
          <Icon icon="iconunie63a" />
        </div>
        <CSSTransition in={showNavList} timeout={1000} classNames={classNames} unmountOnExit={true}>
          <nav className="nav">
            {navList.map(item => (
              <Link key={item.id} to={item.url} className="nav-item">
                <Icon icon={item.icon} />
                {item.text}
              </Link>
            ))}
          </nav>
        </CSSTransition>
      </div>
    )
  }
}

export default injectIntl(TopBar)
