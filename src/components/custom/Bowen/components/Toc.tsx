import React, { PureComponent, ReactChild } from 'react'
import { CSSTransition } from 'react-transition-group'
import config from '../config'

const top = config.top
const step = config.step

export interface TocItem {
  id: number
  text: string
}

interface Props {
  title?: string
  tocs: TocItem[]
}

interface State {
  showToc: boolean
}

class Toc extends PureComponent<Props, State> {
  public requestId: number

  public state: State = {
    showToc: false
  }

  public constructor(props: Props) {
    super(props)
    this.requestId = 0
    this.toggleToc = this.toggleToc.bind(this)
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

  public toggleToc(): void {
    const { showToc } = this.state
    this.setState({ showToc: !showToc })
  }

  public render(): ReactChild {
    const { toggleToc } = this
    const { showToc } = this.state
    const { tocs, title } = this.props

    return (
      <CSSTransition
        in={showToc}
        timeout={1000}
        classNames={'toc'}
        // mountOnEnter={true}
        // unmountOnExit={true}
      >
        <aside>
          {title ? <div className="title">{title}</div> : null}
          <ul id="toc">
            {tocs.map((item, index) => (
              <li key={item.text} className="toc-item" onClick={() => this.setActive(index)}>
                {item.text}
              </li>
            ))}
          </ul>
          <div className="toc-arrow" onClick={toggleToc}>
            {showToc ? '«' : '»'}
          </div>
        </aside>
      </CSSTransition>
    )
  }
}

export default Toc
