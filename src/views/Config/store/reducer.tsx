import { fromJS } from 'immutable'
import { State } from './types'

const originState: State = {
  isMobileTerminal: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ),
  types: [
    {
      id: 1,
      text: '前端开发',
      tags: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    { id: 2, text: '开发工具', tags: [18, 19] },
    { id: 3, text: 'Python 开发', tags: [12] },
    {
      id: 4,
      text: '数据库',
      tags: [15, 16, 17]
    },
    {
      id: 5,
      text: '后端开发',
      tags: [10, 11, 12]
    },
    { id: 6, text: '小程序开发', tags: [] },
    { id: 7, text: '区块链', tags: [] },
    { id: 8, text: '人工智能', tags: [] },
    { id: 9, text: '服务器', tags: [13, 14] },
    { id: 10, text: '移动端', tags: [] },
    { id: 11, text: '计算机基础', tags: [] }
  ],
  tags: [
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