import Markdown from '../../../libs/markdown';

export default class editor extends Markdown {
  document(locale) {
    return require(`./editor.${locale}.md`);
  }
}
