import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { withAnimateRoute } from '../../components'

interface StateToProps {
  showBtn: boolean
  classNames: CSSTransition.CSSTransitionClassNames
}

interface DispathToProps {
  toggleShowBtn(): void
}

export type Props = StateToProps & DispathToProps

class Home extends PureComponent<Props, {}> {
  public render(): React.ReactNode {
    const { showBtn, classNames, toggleShowBtn } = this.props

    return (
      <div className="home">
        <CSSTransition
          in={showBtn}
          timeout={1000}
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

const mapStateToProps = (state: { getIn: Function }): StateToProps => ({
  showBtn: state.getIn(['home', 'showBtn']),
  classNames: state.getIn(['home', 'classNames']).toJS()
})

const mapDispatchToProps = (dispath: Function): DispathToProps => ({
  toggleShowBtn(): void {
    dispath(actionCreators.getToggleBtn())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAnimateRoute(Home))
