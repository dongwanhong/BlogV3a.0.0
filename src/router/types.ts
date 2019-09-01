import { RouteConfig } from './renderRoutes'

export interface ArticleConfig {
  show: boolean // 是否在文章列表页面展示
  title: string // 博文标题
  des: string // 博文摘要
  src: string // 页面截图的 url地址
  tags: string[] // 博文内容涉及标签
  types: string[] // 博文主要所属类型
}

export type ArticleRouteConfig = RouteConfig & ArticleConfig
