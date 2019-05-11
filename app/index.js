if (module.hot) {
    module.hot.accept();
}

import './styles/app.less'
import { square } from './math'

console.log(square(2))
