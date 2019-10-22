import { RouteConfig } from './renderRoutes'

export interface ArticleConfig {
  show: boolean // 是否在文章列表页面展示
  title: string // 博文标题
  des: string // 博文摘要
  src: string // 页面截图的 url地址
  tags: string[] // 博文内容涉及标签
  types: string[] // 博文主要所属类型
  birthTime: string // 博文创建时间
}

export type ArticleRouteConfig = RouteConfig & ArticleConfig

// birthTime 由程序自动加入，不需要手写
export type RetArticleRouteConfig = Omit<ArticleConfig, 'birthTime'> & RouteConfig
