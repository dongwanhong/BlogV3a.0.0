import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CSSTransition } from 'react-transition-group'
import DocumentTitle from 'react-document-title'
import { injectIntl, WrappedComponentProps } from 'react-intl'
import { withAnimateRoute, WaterWave, Rain, TopBar, Footer } from '../../components'
import { State as StateToProps, actionCreators } from './store'
import { AppState } from '../../store'
import bgImage from '../../images/pages/home/bg-home.jpg'

interface DispathToProps {
  toggleShowBtn(eve?: React.MouseEvent<HTMLDivElement, MouseEvent>): void
  changeRainRunStatus(eve?: React.MouseEvent<HTMLDivElement, MouseEvent>): void
}

type RetStateToProps = StateToProps & {
  isMobileTerminal: boolean
}

export type Props = RetStateToProps & DispathToProps & WrappedComponentProps<'intl'>

class Home extends PureComponent<Props, {}> {
  public componentWillUnmount(): void {
    const { showBtn, toggleShowBtn } = this.props
    if (showBtn) toggleShowBtn()
  }

  public render(): React.ReactNode {
    const {
      showBtn,
      classNames,
      toggleShowBtn,
      timeout,
      intl,
      isMobileTerminal,
      running
    } = this.props
    const title = intl.formatMessage({ id: 'doc.main' })

    return (
      <DocumentTitle title={title}>
        {isMobileTerminal ? (
          <div className="home" onClick={e => toggleShowBtn(e)}>
            <CSSTransition
              in={showBtn}
              timeout={timeout}
              classNames={classNames}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <TopBar />
            </CSSTransition>
            <CSSTransition
              in={showBtn}
              timeout={timeout}
              classNames={classNames}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Footer />
            </CSSTransition>
            <Rain running={running} />
          </div>
        ) : (
          <WaterWave url={bgImage}>
            <div className="home" onClick={e => toggleShowBtn(e)}>
              <CSSTransition
                in={showBtn}
                timeout={timeout}
                classNames={classNames}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <TopBar />
              </CSSTransition>
              <CSSTransition
                in={showBtn}
                timeout={timeout}
                classNames={classNames}
                mountOnEnter={true}
                unmountOnExit={true}
              >
                <Footer />
              </CSSTransition>
              <Rain running={running} />
            </div>
          </WaterWave>
        )}
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state: AppState): RetStateToProps => ({
  isMobileTerminal: state.getIn(['config', 'isMobileTerminal']),
  showBtn: state.getIn(['home', 'showBtn']),
  running: state.getIn(['home', 'running']),
  timeout: state.getIn(['home', 'timeout']),
  classNames: state.getIn(['home', 'classNames']).toJS()
})

const mapDispatchToProps = (dispath: Dispatch): DispathToProps => ({
  toggleShowBtn(e): void {
    if (e && (e.target as Element).nodeName.toLocaleLowerCase() !== 'canvas') return
    dispath(actionCreators.getToggleBtn())
  },
  changeRainRunStatus(e): void {
    if (e && (e.target as Element).nodeName.toLocaleLowerCase() !== 'canvas') return
    dispath(actionCreators.getToggleRainAnimation())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAnimateRoute(injectIntl(Home)))
