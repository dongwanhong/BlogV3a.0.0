import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { withAnimateRoute, Rain, WaterWave } from '../../components'
import { State as StateToProps } from './store'
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
      <WaterWave url={bgImage}>
        <div className="home" onClick={toggleShowBtn}>
          <Rain />
          <CSSTransition
            in={showBtn}
            timeout={timeout}
            classNames={classNames}
            mountOnEnter={true}
            unmountOnExit={true}
          >
            <div className="toggle-btn">
              <Link to="/main" target="_self">
                <em className="icon icon-book" />
              </Link>
            </div>
          </CSSTransition>
        </div>
      </WaterWave>
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
