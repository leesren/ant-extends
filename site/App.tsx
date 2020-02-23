import * as React from 'react';
import * as ReactDOM from 'react-dom';

import 'core-js';
import 'antd/dist/antd.min.css';
import './styles/base.scss';
import './styles/prism.css';

function inChinaConfirm() {
    // import('../src/message-box').then(MessageBox => {
    //     // @ts-ignore
    //     MessageBox.default.confirm('建议大陆用户访问部署在国内的站点，是否跳转？', '提示').then(() => {
    //     });
    // });
}
import App from './page';

function inChina() {
    return // 取消检测
    if (window.fetch && document.domain !== 'https://github.com/leesren/ant-extends') {
        fetch('//restapi.amap.com/v3/ip?output=JSON&key=53a87f7c6a6d173be31d4123958ad5c2')
            .then(res => res.json())
            .then(({ city }) => {
                if (city && typeof city === 'string') {
                    inChinaConfirm();
                }
            })
    }
}
ReactDOM.render(<App />, document.getElementById('app'), inChina);
// @ts-ignore
if (module.hot) {
    // @ts-ignore
    module.hot.accept('./page', () => {
        const App = require('./page').default;
        ReactDOM.render(<App />, document.getElementById('app'));
    });
}