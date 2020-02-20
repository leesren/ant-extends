export default {
  documents: {
    'quick-start': require('./quick-start'),
    'i18n': require('./i18n'),
    // 'custom-theme': require('./custom-theme')
  },
  components: {
    'Basic': {
      'icon': require('./icon'),
      'button': require('./button')
    },
    'Form': { 
      'color-picker': require('./color-picker'),
      'radio-research': require('./radio-research'),
    },
    'Data': {
      'table': require('./table'),
      'tag': require('./tag'), 
    },
    'Notice': {
      'ai-title': require('./ai-title'),
      'empty': require('./empty'),
    },
    'Nav': {
    },
    'Others': {
    }
  }
}
