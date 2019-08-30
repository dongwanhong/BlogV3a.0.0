import React, { PureComponent, ReactChild, RefObject, createRef } from 'react'
import { TopBar, Pagination, TagBall, TagItem } from '@/components'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { State as StateToProps } from '@views/Config/store/types'
import ArticleItem from './components/ArticleItem'
import image from '@images/doraemon.png'

type Props = StateToProps

interface State {
  width: number
  height: number
}

const test = [
  {
    des: `配置 react-router-dom 我们开发一个 React
  工程肯定不是一两个“页面”就可以满足需求的，所以我们需要一个在多个“页面”中跳转的功能，在使用
  React 构建的单页面应用中，要想实现页面间`,
    to: 'sdfs',
    src: image,
    title: '我是文章的标题'
  }
]

class ArticleList extends PureComponent<Props, State> {
  public ele: RefObject<HTMLDivElement>

  public state: State = {
    width: 0,
    height: 0
  }

  public componentDidMount(): void {
    const eleDom = this.ele.current
    const defaultWidth = eleDom ? eleDom.offsetWidth : 300
    const defaultHeight = eleDom ? eleDom.offsetHeight : 300
    this.setState({ width: defaultWidth, height: defaultHeight })
  }

  public constructor(props: Props) {
    super(props)
    this.ele = createRef()
  }

  public render(): ReactChild {
    const { ele } = this
    const { tags } = this.props
    const { width, height } = this.state
    const size = Math.min(width, height)

    return (
      <div className="article-list">
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="list-wrapper col-lg-9 col-xs-12">
              <div className="text-title">
                If you can't explain it simply,
                <div>you don't understand it well enough.</div>
              </div>
              <div className="article-wrapper">
                <ArticleItem
                  title={test[0].title}
                  src={test[0].src}
                  des={test[0].des}
                  to={test[0].to}
                />
              </div>
              <Pagination total={210} />
            </div>
            <div ref={ele} className="col-lg-3 col-xs-12">
              {width ? (
                <TagBall width={size} height={size}>
                  {tags.map(tag => (
                    <TagItem key={tag.id}>{tag.text}</TagItem>
                  ))}
                </TagBall>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  tags: state.getIn(['config', 'tags']).toJS()
})

export default connect(
  mapStateToProps,
  null
)(ArticleList)
