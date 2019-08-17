import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { CSSTransition } from 'react-transition-group'
import DocumentTitle from 'react-document-title'
import { withAnimateRoute, WaterWave, Rain, TopBar } from '../../components'
import { State as StateToProps, actionCreators } from './store'
import { AppState } from '../../store'
import bgImage from '../../images/pages/home/bg-home.jpg'

interface DispathToProps {
  toggleShowBtn(): void
}

export type Props = StateToProps & DispathToProps

class Home extends PureComponent<Props, {}> {
  public componentWillUnmount(): void {
    const { showBtn, toggleShowBtn } = this.props
    if (showBtn) toggleShowBtn()
  }

  public render(): React.ReactNode {
    const { showBtn, classNames, toggleShowBtn, timeout } = this.props

    return (
      <DocumentTitle title="码良的博客">
        <WaterWave url={bgImage}>
          <div className="home" onClick={toggleShowBtn}>
            <CSSTransition
              in={showBtn}
              timeout={timeout}
              classNames={classNames}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <TopBar />
            </CSSTransition>
            <Rain />
          </div>
        </WaterWave>
      </DocumentTitle>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  showBtn: state.getIn(['home', 'showBtn']),
  timeout: state.getIn(['home', 'timeout']),
  classNames: state.getIn(['home', 'classNames']).toJS()
})

const mapDispatchToProps = (dispath: Dispatch): DispathToProps => ({
  toggleShowBtn(): void {
    dispath(actionCreators.getToggleBtn())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAnimateRoute(Home))
