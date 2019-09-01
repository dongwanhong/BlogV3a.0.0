import React, { PureComponent, ReactChild } from 'react'
import config from '../config'

const top = config.top
const step = config.step

export interface TocItem {
  id: number
  text: string
}

interface Props {
  tocs: TocItem[]
}

class Toc extends PureComponent<Props, {}> {
  public requestId: number

  public constructor(props: Props) {
    super(props)
    this.requestId = 0
  }

  public componentDidMount(): void {
    // 设置默认高亮
    document.querySelectorAll('#bowen #toc .toc-item')[0].classList.add('active')
  }

  protected setActive(index: number): void {
    if (this.requestId) cancelAnimationFrame(this.requestId)

    const tocs = document.querySelectorAll('#toc .toc-item')
    const titles = document.querySelectorAll('#bowen section a.title')
    const ele = document.querySelector('#bowen') as HTMLElement
    const cEle = titles[index]
    if (!ele || !cEle || !tocs) return
    Array.from(tocs).forEach(item => item.classList.remove('active'))
    tocs[index].classList.add('active')
    const offsetHeight = ele.offsetHeight
    const scrollHeight = ele.scrollHeight

    const scrollCore = (): void => {
      const nTop = cEle.getBoundingClientRect().top
      if (nTop > top && offsetHeight + ele.scrollTop < scrollHeight) {
        ele.scrollTop += step
        this.requestId = requestAnimationFrame(scrollCore)
      } else if (nTop < 0 && ele.scrollTop > 0) {
        ele.scrollTop -= step
        this.requestId = requestAnimationFrame(scrollCore)
      }
    }
    scrollCore()
  }

  public render(): ReactChild {
    const { tocs } = this.props

    return (
      <aside>
        <ul id="toc">
          {tocs.map((item, index) => (
            <li key={item.text} className="toc-item" onClick={() => this.setActive(index)}>
              {item.text}
            </li>
          ))}
        </ul>
      </aside>
    )
  }
}

export default Toc
