import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { withAnimateRoute, Step, PageScroll, TopBar } from '../../components'
import { State as StateToProps, actionCreators } from './store'
import { AppState } from '../../store'

export interface DispathToProps {
  setActiveIndex: (index: number) => void
}

type Props = StateToProps & DispathToProps

class Resume extends PureComponent<Props, {}> {
  public constructor(props: Props) {
    super(props)
    this.setActivePage = this.setActivePage.bind(this)
  }

  public setActivePage(isDown: boolean): void {
    const { activeIndex, setActiveIndex } = this.props
    const count = 4
    if (isDown && activeIndex + 1 < count) {
      setActiveIndex(activeIndex + 1)
    } else if (!isDown && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
    }
  }

  public render(): React.ReactNode {
    const { setActivePage } = this
    const { activeIndex, setActiveIndex } = this.props

    return (
      <div className="resume">
        <div className="top-bar-warpper">
          <TopBar />
        </div>
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
  activeIndex: state.getIn(['resume', 'activeIndex'])
})

const mapDispatchToProps = (dispath: Dispatch): DispathToProps => ({
  setActiveIndex(index: number): void {
    dispath(actionCreators.getSetActiveIndex(index))
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAnimateRoute(Resume))
