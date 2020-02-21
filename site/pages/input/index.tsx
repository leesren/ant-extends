import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Input extends Markdown {
  static defaultProps = {
    customItem: require('./custom-item')
  }
  document(locale) {
    return require(`../../docs/${locale}/input.md`);
  }
}

