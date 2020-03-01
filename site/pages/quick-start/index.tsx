import Markdown from '../../../libs/markdown';

export default class QuickStart extends Markdown {
  document(locale) {
    return require(`./quick-start.${locale}.md`);
  }
}
