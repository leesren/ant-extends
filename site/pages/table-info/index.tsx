import Markdown from '../../../libs/markdown';


export default class TableInfo extends Markdown {
  document(locale) {
    return require(`./table-info.${locale}.md`);
  }
}
