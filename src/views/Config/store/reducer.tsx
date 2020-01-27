import { fromJS } from 'immutable'
import { State } from './types'

const tags = [
  { id: 0, text: 'All' },
  { id: 1, text: 'HTML' },
  { id: 2, text: 'CSS' },
  { id: 3, text: 'JavaScript' },
  { id: 4, text: 'jQuery' },
  { id: 5, text: 'AJAX' },
  { id: 6, text: 'React' },
  { id: 7, text: 'Vue' },
  { id: 8, text: 'AngularJS' },
  { id: 9, text: 'TypeScript' },
  { id: 10, text: 'Node.js' },
  { id: 11, text: 'Java' },
  { id: 12, text: 'Python' },
  { id: 13, text: 'Linux' },
  { id: 14, text: 'Docker' },
  { id: 15, text: 'SQL' },
  { id: 16, text: 'MySQL' },
  { id: 17, text: 'MongoDB' },
  { id: 18, text: 'Git' },
  { id: 19, text: 'Chrome' }
]

const originState: State = {
  isMobileTerminal: /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  types: [
    {
      id: 0,
      intlId: 'config.typeAll',
      text: '全部',
      tags: tags.map(item => item.id)
    },
    {
      id: 1,
      intlId: 'config.ffDev',
      text: '前端开发',
      tags: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    { id: 2, intlId: 'config.devTool', text: '开发工具', tags: [0, 18, 19] },
    { id: 3, intlId: 'config.pyDev', text: 'Python 开发', tags: [0, 12] },
    {
      id: 4,
      intlId: 'config.database',
      text: '数据库',
      tags: [0, 15, 16, 17]
    },
    {
      id: 5,
      intlId: 'config.beDev',
      text: '后端开发',
      tags: [0, 10, 11, 12]
    },
    { id: 6, intlId: 'config.minDev', text: '小程序开发', tags: [0] },
    { id: 7, intlId: 'config.blockChain', text: '区块链', tags: [0] },
    { id: 8, intlId: 'config.ai', text: '人工智能', tags: [0] },
    { id: 9, intlId: 'config.server', text: '服务器', tags: [0, 13, 14] },
    { id: 10, intlId: 'config.mobile', text: '移动端', tags: [0] },
    { id: 11, intlId: 'config.pcBasis', text: '计算机基础', tags: [0] }
  ],
  tags
}

const defaultState = fromJS(originState)

const reducer = (state = defaultState, action: {}): State => {
  // switch (action.type) {
  //   default:
  //     return state
  // }
  return state
}

export default reducer
