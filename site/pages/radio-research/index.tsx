import Markdown from '../../../libs/markdown';


export default class RadioResearch extends Markdown {
  document(locale) {
    return require(`./radio-research.${locale}.md`);
  }
}
