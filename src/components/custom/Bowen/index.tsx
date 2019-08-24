import React, { PureComponent, ReactChild } from 'react'
import config from './config'
import utils from '@/utils'
import Header from './components/Header'
import Content from './components/Content'
import Title from './components/Title'
import Reference from './components/Reference'
import Footer from './components/Footer'
import Toc, { TocItem } from './components/Toc'
import ToTop from './components/ToTop'

interface Props {
  slideType?: 'css' | 'js'
  toTop?: boolean
  tocs?: TocItem[]
}

function handleScroll(): void {
  const bowen = document.querySelector('#bowen') as HTMLDivElement
  const offsetHeight = bowen.offsetHeight
  const srcrollTop = bowen.scrollTop
  const scrollHeight = bowen.scrollHeight
  let i = 0
  const titles = document.querySelectorAll('#bowen section a.title')
  const tocs = document.querySelectorAll('#toc .toc-item')
  if (!titles.length || !tocs.length) return
  // 获取距离
  const tops = Array.from(titles).map(item => item.getBoundingClientRect().top)
  // tops.forEach((top, index) => top < config.top && i === index)
  i = tops.findIndex(top => top < config.top)
  // 由于存在计算延迟
  // 所以在高亮判断时可以提供一定的误差
  if (offsetHeight + srcrollTop >= scrollHeight - 50) i = tops.length - 1
  // 处理高亮
  Array.from(tocs).forEach((item, index) => {
    item.classList.remove('active')
    if (index === i) item.classList.add('active')
  })
}

const handleScroller = utils.throttle(handleScroll, 4)

class Bowen extends PureComponent<Props, {}> {
  public static Header = Header
  public static Content = Content
  public static Title = Title
  public static Reference = Reference
  public static Footer = Footer
  public static Toc = Toc
  public static ToTop = ToTop

  public render(): ReactChild {
    const { children, toTop = true, slideType, tocs = [] } = this.props
    const styles = { scrollBehavior: 'smooth' } as React.CSSProperties

    return (
      <>
        <article
          id="bowen"
          className="container"
          style={slideType === 'css' ? styles : {}}
          onScroll={() => handleScroller()}
        >
          <div className="row">
            <div className="col-xs-12 col-md-9">{children}</div>
            <div className="col-xs-12 col-md-3">
              <Toc tocs={tocs} />
            </div>
          </div>
        </article>
        {toTop ? <Bowen.ToTop /> : null}
      </>
    )
  }
}

export { Bowen, Header }
