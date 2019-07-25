import React, { PureComponent } from 'react'
import { Step } from '../../components'
import { withAnimateRoute } from '../../components'

class Main extends PureComponent {
  public render(): React.ReactNode {
    return (
      <Step>
        <Step.StepItem title="第一步" />
        <Step.StepItem title="第二步" />
        <Step.StepItem title="第三步" description="我是第三步的描述" />
        <Step.StepItem title="第四步" />
        <Step.StepItem title="第五步" />
      </Step>
    )
  }
}

export default withAnimateRoute(Main)
