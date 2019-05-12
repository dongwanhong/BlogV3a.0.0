if (module.hot) {
    module.hot.accept();
}

import './styles/app.less'

// 被 splitChunks 下缓存组的 lodash 匹配
import _ from 'lodash'

// 被 splitChunks 匹配
import(/* webpackChunkName: "async-util" */ 'util').then(data => console.log(data.default))

const ele = document.createElement('button')
ele.innerHTML = '加载 lazy.js'
ele.onclick = () => {
    // 被 @babel/plugin-syntax-dynamic-import 插件匹配
    import(/* webpackChunkName: "lazy" */ './lazy.js').then(data => console.log(data.default))
}
document.body.appendChild(ele)
