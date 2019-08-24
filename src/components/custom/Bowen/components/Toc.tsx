import React, { SFC } from 'react'
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

function setActive(index: number): void {
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
      requestAnimationFrame(scrollCore)
    } else if (nTop < 0 && ele.scrollTop > 0) {
      ele.scrollTop -= step
      requestAnimationFrame(scrollCore)
    }
  }
  scrollCore()
}

const Toc: SFC<Props> = props => {
  const { tocs } = props

  return (
    <aside>
      <ul id="toc">
        {tocs.map((item, index) => (
          <li key={item.text} className="toc-item" onClick={() => setActive(index)}>
            {item.text}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Toc
