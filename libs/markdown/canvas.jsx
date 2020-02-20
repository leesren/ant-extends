import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import marked from 'marked'
import { transform } from 'babel-standalone'
import Editor from '../editor'

export default class Canvas extends React.Component {
  constructor(props) {
    super(props)

    this.playerId = `${parseInt(Math.random() * 1e9).toString(36)}`
    this.document = this.props.children.match(/([^]*)\n?(```[^]+```)/)
    this.description = marked(this.document[1])
    this.source = this.document[2].match(/```(.*)\n?([^]+)```/)

    this.state = {
      showBlock: false
    }
  }

  componentDidMount() {
    this.renderSource(this.source[2])
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock
    })
  }

  renderSource(value) {
    import('../../src').then(Element => {
      const args = ['context', 'React', 'ReactDOM']
      const argv = [this, React, ReactDOM] 
      for (const key in Element) {
        args.push(key)
        argv.push(Element[key])
      }

      return {
        args,
        argv
      }
    }).then(({
      args, argv
    })=>{
      return import('antd/lib').then(Element=>{
        for (const key in Element) {
          if( typeof Element[key] !== "string" && !args.some(el=>el === key)){
            args.push(key)
            argv.push(Element[key])
          }
        }
        return {
          args,
          argv
        }
      })
    }) 
    .then(({ args, argv }) => {
      const templateCode = `
      class Demo extends React.Component {
        ${value}
      }

      ReactDOM.render(<Demo {...context.props} />, document.getElementById('${this.playerId}'))
    `
      const code = transform(templateCode, {
        presets: ['es2015', 'react']
      }).code

      args.push(code)

      // 渲染点
      const fn = new Function(...args);
      fn.apply(null, argv);
      /**
       * https://www.cnblogs.com/xiaokeai0110/p/10029024.html
       new Function 允许将任何字符串转换为函数
       let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
       最后一个是代码，arg1->argN 是参数，这个才妙了👏👏👏，
       一般new Function 指向的全局，如果访问局部的，可以传递一个上下文上去，比如 context
       */
      this.source[2] = value
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    })
  }

  render() {
    return (
      <div className={`demo-block demo-box demo-${this.props.name}`}>
        <div className="source" id={this.playerId} />
        {
          this.state.showBlock && (
            <div className="meta">
              {
                this.description && (
                  <div
                    ref="description"
                    className="description"
                    dangerouslySetInnerHTML={{ __html: this.description }}
                  />
                )
              }
              <Editor
                value={this.source[2]}
                onChange={code => this.renderSource(code)}
              />
            </div>
          )
        }
        <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
          {
            this.state.showBlock ? (
              <span>
                <i className="el-icon-caret-top" />{this.props.locale.hide}
              </span>
            ) : (
              <span>
                <i className="el-icon-caret-bottom" />{this.props.locale.show}
              </span>
            )
          }
        </div>
      </div>
    )
  }
}

Canvas.propTypes = {
  locale: PropTypes.object
}

Canvas.defaultProps = {
  locale: {}
}
