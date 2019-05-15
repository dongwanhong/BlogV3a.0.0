if (module.hot) {
    module.hot.accept();
}

import $ from 'jquery';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 由于忽略了语言包的引入，所以需要单独引入我们所需的语言包
import '@style/app';

moment.locale('zh-cn');

$('body').html(`window.$ === $: ${ (window.$ === $).toString() }`);
