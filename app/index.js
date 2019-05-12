if (module.hot) {
    module.hot.accept();
}

import './styles/app.less'

const ele = document.createElement('button')
ele.innerHTML = '加载 lazy.js'
ele.onclick = () => {
    import(/* webpackChunkName: "lazy" */ './lazy.js').then(data => console.log(data.default))
}
document.body.appendChild(ele)
