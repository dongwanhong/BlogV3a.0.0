import React, { PureComponent, ReactChild } from 'react'
import { TopBar } from '@/components'
import ArticleItem from './components/ArticleItem'
import image from '@images/doraemon.png'

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

class ArticleList extends PureComponent {
  public render(): ReactChild {
    return (
      <div className="article-list">
        <TopBar />
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-xs-12">
              {/* <div className="text-title">
                If you can't explain it simply, you don't understand it well enough.
              </div> */}
              <div className="article-wrapper">
                <ArticleItem
                  title={test[0].title}
                  src={test[0].src}
                  des={test[0].des}
                  to={test[0].to}
                />
              </div>
            </div>
            <div className="col-lg-3 col-xs-12">e</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ArticleList
