import { fromJS } from 'immutable'
import { State } from './types'

const originState: State = {
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
