import React, { Component } from 'react'
import { Link } from '../../index'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { Icon, Draweer } from '@/components'

const classNames: CSSTransitionClassNames = {
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

interface StateToProps {
  isMobileTerminal: boolean
}

interface OwnProps {
  navList?: NavList
}

type Props = WrappedComponentProps<'intl'> & StateToProps & OwnProps

interface State {
  showNavList: boolean
  showConfig: boolean
}

class TopBar extends Component<Props, State> {
  public state: State = {
    showNavList: !this.props.isMobileTerminal,
    showConfig: false
  }

  public constructor(props: Props) {
    super(props)
    this.toggleNav = this.toggleNav.bind(this)
    this.toggleConfig = this.toggleConfig.bind(this)
    this.handleConfigClick = this.handleConfigClick.bind(this)
  }

  private toggleNav(): void {
    if (!this.props.isMobileTerminal) return
    const { showNavList } = this.state
    this.setState(() => ({ showNavList: !showNavList }))
  }

  private handleConfigClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    e.preventDefault()
    this.setState(() => ({ showConfig: true }))
  }

  public toggleConfig(): void {
    this.setState(() => ({ showConfig: false }))
  }

  public render(): React.ReactNode {
    const { toggleNav, handleConfigClick, toggleConfig } = this
    const { showNavList, showConfig } = this.state
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
          url: '/project',
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
          url: '/resume',
          text: intl.formatMessage({ id: 'topbar.resume' }),
          icon: 'iconguanyuwomen'
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
          <nav className="nav" onClick={toggleNav}>
            {navList.map(item => (
              <Link key={item.id} to={item.url} className="nav-item">
                <Icon icon={item.icon} />
                {item.text}
              </Link>
            ))}
            <Link key={6} to="/config" className="nav-item" onClick={e => handleConfigClick(e)}>
              <Icon icon="iconshezhi" />
              {intl.formatMessage({ id: 'topbar.setting' })}
            </Link>
            <Draweer show={showConfig} onClose={toggleConfig} />
          </nav>
        </CSSTransition>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  isMobileTerminal: state.getIn(['config', 'isMobileTerminal'])
})

export default connect<StateToProps, {}, OwnProps, AppState>(
  mapStateToProps,
  {}
)(injectIntl(TopBar))
