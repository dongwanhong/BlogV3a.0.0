import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Step, PageScroll } from '../../components'
import { withAnimateRoute } from '../../components'
import { State as StateToProps } from './store'
import { AppState } from '../../store'
import { actionCreators } from './store'

export interface DispathToProps {
  setActiveIndex: (index: number) => void
}

type Props = StateToProps & DispathToProps

class Main extends PureComponent<Props, {}> {
  public constructor(props: Props) {
    super(props)
    this.setActivePage = this.setActivePage.bind(this)
  }

  public setActivePage(isDown: boolean): void {
    const { activeIndex, setActiveIndex } = this.props
    const count = 4
    if (isDown && activeIndex + 1 < count) {
      setActiveIndex(activeIndex + 1)
    } else if (!isDown && activeIndex >= 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  public render(): React.ReactNode {
    const { setActivePage } = this
    const { activeIndex, setActiveIndex } = this.props

    return (
      <div className="main">
        <div className="step-container">
          <Step
            mode="circle"
            content="color"
            direction="vertical"
            extra={true}
            activeIndex={activeIndex}
            onChange={setActiveIndex}
          >
            <Step.StepItem />
            <Step.StepItem />
            <Step.StepItem />
            <Step.StepItem />
          </Step>
        </div>
        <PageScroll activeIndex={activeIndex} onSlide={setActivePage}>
          <PageScroll.PageItem>1</PageScroll.PageItem>
          <PageScroll.PageItem>2</PageScroll.PageItem>
          <PageScroll.PageItem>3</PageScroll.PageItem>
          <PageScroll.PageItem>4</PageScroll.PageItem>
        </PageScroll>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  activeIndex: state.getIn(['main', 'activeIndex'])
})

const mapDispatchToProps = (dispath: Dispatch): DispathToProps => ({
  setActiveIndex(index: number): void {
    dispath(actionCreators.getSetActiveIndex(index))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAnimateRoute(Main))
