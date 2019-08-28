import React, { Component, ReactChild, ChangeEvent } from 'react'

interface Params {
  total: number
  pageNum: number
  pageSize: number
}

interface Props {
  total?: number // 总条数
  pageNum?: number // 当前显示页
  pageSize?: number // 每页显示条数
  count?: number // 每页显示的按钮数
  onChange?: (p: Params) => void
  gap?: boolean
  bordered?: boolean
}

interface State {
  baseNum: number // 按钮的基数
  pageNum: number
  pageSize: number // 每页显示的条数，以 props 传入的值作为默认值
}

class Pagination extends Component<Props, State> {
  public constructor(props: Props) {
    super(props)
  }

  public state = {
    baseNum: 1,
    pageNum: this.props.pageNum || 1,
    pageSize: this.props.pageSize || 10
  }

  public handleChange(eve: ChangeEvent<HTMLSelectElement>): void {
    this.setState({ pageSize: Number(eve.target.value) })
  }

  public handleClick(newPageNum: number, update: boolean = true): void {
    const { pageNum, pageSize } = this.state
    const { total = 0, onChange } = this.props
    if (pageNum === newPageNum) return
    const params = {
      pageNum: newPageNum,
      pageSize,
      total
    }
    if (update) this.setState({ pageNum: newPageNum })
    if (onChange) onChange(params)
  }

  public getBtnNum(): number {
    const { total = 0, count = 10 } = this.props
    const { pageSize } = this.state
    let btnNum = total / pageSize
    if (btnNum >= count) {
      btnNum = count
    } else {
      btnNum = Math.ceil(btnNum)
    }
    return btnNum
  }

  public goTo(step: number): void {
    const { total = 0 } = this.props
    const { pageSize } = this.state
    const btnTotalNum = Math.ceil(total / pageSize) // 总的按钮数
    const btnNum = this.getBtnNum() // 显示的按钮数
    const { baseNum } = this.state // 按钮值的基数
    let newNum = 0 // 新按钮值的基数
    if (step > 0) {
      newNum = baseNum + step + btnNum
      if (newNum > btnTotalNum) {
        newNum = btnTotalNum - btnNum + 1
      } else {
        newNum = step + baseNum
      }
    } else {
      newNum = baseNum + step
      if (newNum < 0) {
        newNum = 0
      }
    }
    this.setState({ baseNum: newNum, pageNum: newNum })
    this.handleClick(newNum, false)
  }

  public render(): ReactChild {
    const { baseNum, pageNum, pageSize } = this.state
    const { bordered = true, gap = true } = this.props
    let btnNum = this.getBtnNum()
    const classNames = ['pagination']

    if (bordered) {
      classNames.push('bordered')
    }
    if (gap) {
      classNames.push('gap')
    }

    return (
      <ul className={classNames.join(' ')}>
        <li className="pagination-item" onClick={() => this.goTo(-5)}>
          «
        </li>
        {Array(btnNum)
          .fill(0)
          .map((item, index) => {
            const curItem = baseNum + index
            return (
              <li
                key={index}
                className={pageNum === curItem ? 'pagination-item active' : 'pagination-item'}
                onClick={() => this.handleClick(curItem)}
              >
                {curItem}
              </li>
            )
          })}
        <li className="pagination-item" onClick={() => this.goTo(+5)}>
          »
        </li>
        <li className="pagination-size">
          <select value={pageSize} onChange={eve => this.handleChange(eve)}>
            <option value="10">10 条/页</option>
            <option value="20">20 条/页</option>
            <option value="30">30 条/页</option>
            <option value="40">40 条/页</option>
          </select>
        </li>
      </ul>
    )
  }
}

export default Pagination
