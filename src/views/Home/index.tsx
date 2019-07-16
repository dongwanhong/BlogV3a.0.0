import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { withAnimateRoute } from '../../components'
import { State as StateToProps } from './store'
import { AppState } from '../../store'

interface DispathToProps {
  toggleShowBtn(): void
}

export type Props = StateToProps & DispathToProps

class Home extends PureComponent<Props, {}> {
  public render(): React.ReactNode {
    const { showBtn, classNames, toggleShowBtn, timeout } = this.props

    return (
      <div className="home">
        <CSSTransition
          in={showBtn}
          timeout={timeout}
          classNames={classNames}
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <div className="toggle-btn animated">
            <Link to="/main" target="_self">
              <em className="icon icon-book" />
            </Link>
          </div>
        </CSSTransition>
        <div className="content" onClick={toggleShowBtn.bind(this)}>
          <p>If you can't explain it simply,</p>
          <p>you don't understand it well enough.</p>
        </div>
      </div>
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
