import React from 'react'
import { render } from 'react-dom'
import moment from 'moment'
import App from './views/App'
import 'moment/locale/zh-cn'
import '@styles/app'

moment.locale('zh-cn')
render(<App />, document.getElementById('root'))
