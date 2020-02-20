
import Markdown from '../../../libs/markdown';

// import './style.scss';

export default class Empty extends Markdown {
  document(locale) {
    return require(`../../docs/${locale}/empty.md`);
  }
}
