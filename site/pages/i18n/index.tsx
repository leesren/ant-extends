import Markdown from '../../../libs/markdown';

import './style.scss';

export default class i18n extends Markdown {
  document(locale) {
    return require(`./i18n.${locale}.md`);
  }
}
