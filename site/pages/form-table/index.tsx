import Markdown from '../../../libs/markdown';

export default class FormTable extends Markdown {
  document(locale) {
    return require(`./form-table.${locale}.md`);
  }
}
