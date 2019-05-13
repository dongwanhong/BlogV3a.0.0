if (module.hot) {
    module.hot.accept();
}

import './styles/app.less'

const obj = {name: 'anani'}
console.log(clone(obj))

import $ from 'jquery';
$('body').html('Hello world!')
