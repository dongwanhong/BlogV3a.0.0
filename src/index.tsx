// eslint-disable-next-line
import $ from 'jquery'
import moment from 'moment'
import 'moment/locale/zh-cn'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App'
import '@styles/app'

moment.locale('zh-cn')
ReactDOM.render(<App compiler="TypeScript" framework="React" />, document.getElementById('root'))

/* eslint-disable */
if ((module as any).hot) {
  ;(module as any).hot.accept()
}
