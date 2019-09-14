import React, { PureComponent, ReactChild, RefObject, createRef } from 'react'
import { TopBar, Pagination, TagBall, TagItem } from '@/components'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { State as StateToProps } from '@views/Config/store/types'
import ArticleItem from './components/ArticleItem'
import { articles } from '@/router'
import image from '@images/doraemon.png'

const isPhone = document.documentElement.clientWidth <= 1200

interface ArticleConfig {
  key: string | number
  title: string
  src: string
  to: string
  des: string
}

type Props = StateToProps

interface State {
  width: number
  height: number
  filteredArticles: ArticleConfig[]
}

const adjustedArticles: ArticleConfig[] = []
articles.forEach((item, index) => {
  if (!item.show) return
  const newItem: ArticleConfig & { title: string } = {
    key: item.key || item.path || index,
    title: item.title,
    src: item.src || image,
    to: item.path || '/404',
    des: item.des
  }
  adjustedArticles.push(newItem)
})

class ArticleList extends PureComponent<Props, State> {
  public ele: RefObject<HTMLDivElement>

  public state: State = {
    width: 0,
    height: 0,
    filteredArticles: adjustedArticles
  }

  public constructor(props: Props) {
    super(props)
    this.ele = createRef()
  }

  public componentDidMount(): void {
    const eleDom = this.ele.current
    const defaultWidth = eleDom ? eleDom.offsetWidth : 300
    const defaultHeight = eleDom ? eleDom.offsetHeight : 300
    this.setState({ width: defaultWidth, height: defaultHeight })
  }

  public render(): ReactChild {
    const { ele } = this
    const { tags } = this.props
    const { width, height, filteredArticles } = this.state
    const size = Math.min(width, height)
    const total = filteredArticles.length

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
                {filteredArticles.map(item => (
                  <ArticleItem
                    key={item.key}
                    title={item.title}
                    src={item.src}
                    des={item.des}
                    to={item.to}
                  />
                ))}
              </div>
              <Pagination total={total} />
            </div>
            <div ref={ele} className="col-lg-3 col-xs-12">
              {width && !isPhone ? (
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
