import Markdown from '../../../libs/markdown';

import './style.scss';

export default class Icon extends Markdown {
  static defaultProps = {
    iconList: require('./iconList')
  }
  document(locale) {
    return require(`./icon.${locale}.md`);
  }
}

