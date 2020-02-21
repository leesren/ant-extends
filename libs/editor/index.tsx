import * as React from 'react' 
import * as CodeMirror from 'codemirror'

import 'codemirror/mode/jsx/jsx'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/comment/comment'

import 'codemirror/lib/codemirror.css'
import './style.scss'

export default class Editor extends React.Component<any, {
  onChange: (value: any) => void,
  value: string
}> {
  editor: any
  cm: any
  timeout: any
  componentDidMount() {
    const { onChange, value } = this.props

    this.cm = CodeMirror(this.editor, {
      mode: 'jsx',
      theme: 'react',
      keyMap: 'sublime',
      viewportMargin: Infinity,
      lineNumbers: false,
      dragDrop: false
    });

    this.cm.setValue(value)

    this.cm.on('changes', cm => {
      if (onChange) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
          onChange(cm.getValue());
        }, 300);
      }
    })
  }


  render() {
    return <div className="editor" ref={ref => (this.editor = ref)} />
  }
}
