import React from 'react';
// @ts-ignore
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'core-js';


import './styles/base.scss';
import './styles/prism.css';

import App from './page';

function inChinaConfirm() {
  import('../src/message-box').then(MessageBox => {
    // @ts-ignore
    MessageBox.default.confirm('建议大陆用户访问部署在国内的站点，是否跳转？', '提示').then(() => {
      location.href = 'https://ele.me';
    });
  });
}

function inChina() {
  return // 取消检测
  if (window.fetch && document.domain !== 'ele.me') {
    fetch('//restapi.amap.com/v3/ip?output=JSON&key=53a87f7c6a6d173be31d4123958ad5c2')
      .then(res => res.json())
      .then(({ city }) => {
        if (city && typeof city === 'string') {
          inChinaConfirm();
        }
      })
  }
}

render(<AppContainer><App /></AppContainer>, document.getElementById('app'), inChina);
// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('./page', () => {
    const App = require('./page').default;

    render(<AppContainer><App /></AppContainer>, document.getElementById('app'));
  });
}
