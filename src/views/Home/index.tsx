import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'

const classNames = {
  enter: 'animated',
  enterActive: 'slideInDown',
  exit: 'animated',
  exitActive: 'slideOutUp'
}

class Home extends Component<{ showBtn: boolean; toggleShowBtn: Function }> {
  public render(): React.ReactNode {
    const { showBtn, toggleShowBtn } = this.props

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

const mapStateToProps = (state: { getIn: Function }): {} => ({
  showBtn: state.getIn(['home', 'showBtn'])
})

const mapDispatchToProps = (dispath: Function): {} => ({
  toggleShowBtn(): void {
    dispath(actionCreators.getToggleBtn())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
