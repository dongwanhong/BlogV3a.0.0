import React, { Component } from 'react'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionClassNames } from 'react-transition-group/CSSTransition'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Link } from '../../index'
import { AppState } from '@/store'
import { Icon, Draweer } from '@/components'
import { actionCreators as homeActionCreators } from '@views/Home/store'

const classNames: CSSTransitionClassNames = {
  enter: 'animated',
  enterActive: 'slideInLeft',
  exit: 'animated',
  exitActive: 'slideOutLeft'
}

interface DispathToProps {
  changeRainRunStatus(): void
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
  running: boolean
}

interface OwnProps {
  navList?: NavList
}

type Props = WrappedComponentProps<'intl'> & StateToProps & DispathToProps & OwnProps

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
    let { navList, intl, changeRainRunStatus, running } = this.props
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
          url: '/article-list',
          text: intl.formatMessage({ id: 'topbar.article' }),
          icon: 'iconbook'
        },
        {
          id: 3,
          url: 'https://dongwanhong.github.io/source-code/',
          text: intl.formatMessage({ id: 'topbar.project' }),
          icon: 'iconrepo'
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
          </nav>
        </CSSTransition>
        <Draweer
          title="页面配置"
          footnote="More than a coder, more than a designer."
          show={showConfig}
          onClose={toggleConfig}
        >
          <p>
            <label onClick={e => changeRainRunStatus()} className="checkbox">
              <span className="text">首页雨天动画 </span>
              <input
                className="animation"
                type="checkbox"
                defaultChecked={running}
                disabled={window.location.pathname !== '/'}
              />
            </label>
          </p>
        </Draweer>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  isMobileTerminal: state.getIn(['config', 'isMobileTerminal']),
  running: state.getIn(['home', 'running'])
})

const mapDispatchToProps = (dispath: Dispatch): DispathToProps => ({
  changeRainRunStatus(): void {
    dispath(homeActionCreators.getToggleRainAnimation())
  }
})

export default connect<StateToProps, DispathToProps, OwnProps, AppState>(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TopBar))
