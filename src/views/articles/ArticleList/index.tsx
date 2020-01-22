import React, { PureComponent, ReactChild, RefObject, createRef } from 'react'
import { connect } from 'react-redux'
import { AppState } from '@/store'
import { TopBar, Pagination, TagBall, TagItem, Tag, Empty } from '@/components'
import { State as StateToProps, Tag as BallTagType } from '@views/Config/store'
import { TagInfo } from '@/components/common/Tag'
import { Params } from '@/components/common/Pagination'
import ArticleItem from './components/ArticleItem'
import { articles } from '@/router'
import image from '@images/doraemon.png'

interface ArticleConfig {
  key: string | number
  title: string
  src: string
  to: string
  des: string
  tags: string[]
  types: string[]
}

type TagInfoer = TagInfo & {
  tags: number[]
}

type Props = StateToProps

interface State {
  width: number
  height: number
  mount: boolean
  tags: BallTagType[]
  activeTagIndex: number
  types: TagInfoer[]
  pageNum: number
  pageSize: number
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
    des: item.des,
    types: item.types,
    tags: item.tags
  }
  adjustedArticles.push(newItem)
})

class ArticleList extends PureComponent<Props, State> {
  public ele: RefObject<HTMLDivElement>
  private filteredArticlesByType: ArticleConfig[]

  public state: State = {
    width: 0,
    height: 0,
    mount: true,
    activeTagIndex: -1,
    tags: [],
    pageNum: 1,
    pageSize: 10,
    types: this.getDefaultTypes(),
    filteredArticles: adjustedArticles
  }

  public constructor(props: Props) {
    super(props)
    this.ele = createRef()
    this.filteredArticlesByType = []

    this.changTags = this.changTags.bind(this)
    this.handlePaginationChange = this.handlePaginationChange.bind(this)
    this.filterArticlesBYTag = this.filterArticlesBYTag.bind(this)
    this.filterArticlesBYType = this.filterArticlesBYType.bind(this)
  }

  public componentWillMount(): void {
    const { types } = this.state
    this.changTags(types[0])
  }

  private getDefaultTypes(): TagInfoer[] {
    return this.props.types.map(item => {
      ;(item as TagInfoer).active = false
      return item
    })
  }

  public componentDidMount(): void {
    const eleDom = this.ele.current
    const defaultWidth = eleDom ? eleDom.offsetWidth : 300
    const defaultHeight = eleDom ? eleDom.offsetHeight : 300
    this.setState({ width: defaultWidth, height: defaultHeight })
  }

  protected changTags(tagInfo: TagInfoer): void {
    this.filterArticlesBYType(tagInfo)
    this.activeSelectTag(tagInfo)
  }

  private activeSelectTag(tagInfo: TagInfoer): void {
    const { types } = this.state
    const newTypes = types.map(
      (item): TagInfoer => {
        item.active = false
        if (item.text === tagInfo.text) {
          item.active = true
        }
        return item
      }
    )
    this.setState(() => ({ types: newTypes }))
  }

  protected filterArticlesBYType(tagInfo: TagInfoer): void {
    let newArticles = [...adjustedArticles]
    const { tags } = this.props
    if (tagInfo.text !== '全部') {
      newArticles = adjustedArticles.filter(item => item.types.includes(tagInfo.text))
    }
    const retTags = tags.filter(item => tagInfo.tags.includes(item.id))
    this.setState(
      () => ({ tags: retTags, filteredArticles: newArticles, activeTagIndex: -1, mount: false }),
      () => {
        this.filteredArticlesByType = newArticles
        this.setState(() => ({
          mount: true
        }))
      }
    )
  }

  protected filterArticlesBYTag(item: BallTagType, index: number): void {
    const { filteredArticlesByType } = this
    const newArticles = filteredArticlesByType.filter(oItem => oItem.tags.includes(item.text))
    this.setState(() => ({ filteredArticles: newArticles, activeTagIndex: index }))
  }

  private handlePaginationChange(p: Params): void {
    const { pageNum = 1, pageSize = 10 } = p || {}
    this.setState(() => ({
      pageNum,
      pageSize
    }))
  }

  public render(): ReactChild {
    const { ele, changTags, filterArticlesBYTag, handlePaginationChange } = this
    const { isMobileTerminal } = this.props
    const {
      tags,
      types,
      width,
      height,
      filteredArticles,
      activeTagIndex,
      mount,
      pageNum,
      pageSize
    } = this.state
    const size = Math.min(width, height)
    const total = filteredArticles.length

    return (
      <div className="article-list">
        <TopBar />
        <div className="container">
          <div className="text-title">
            If you can't explain it simply,
            <div>you don't understand it well enough.</div>
          </div>
          <div className="row">
            <div ref={ele} className="col-lg-3 col-xs-12">
              {<Tag onChange={tagInfo => changTags(tagInfo as TagInfoer)} tags={types} />}
              {width && !isMobileTerminal && tags.length && mount ? (
                <TagBall width={size} height={size}>
                  {tags.map((tag, index) => (
                    <TagItem
                      key={tag.id}
                      className={activeTagIndex === index ? 'active' : ''}
                      onClick={() => filterArticlesBYTag(tag, index)}
                    >
                      {tag.text}
                    </TagItem>
                  ))}
                </TagBall>
              ) : null}
            </div>
            <div className="list-wrapper col-lg-9 col-xs-12">
              <div className="article-wrapper">
                {filteredArticles.slice((pageNum - 1) * pageSize, pageNum * pageSize).map(item => (
                  <ArticleItem
                    key={item.key}
                    title={item.title}
                    src={item.src}
                    des={item.des}
                    to={item.to}
                  />
                ))}
                {!filteredArticles.length && <Empty />}
              </div>
              <Pagination total={total} onChange={handlePaginationChange} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState): StateToProps => ({
  isMobileTerminal: state.getIn(['config', 'isMobileTerminal']),
  tags: state.getIn(['config', 'tags']).toJS(),
  types: state.getIn(['config', 'types']).toJS()
})

export default connect(
  mapStateToProps,
  null
)(ArticleList)
