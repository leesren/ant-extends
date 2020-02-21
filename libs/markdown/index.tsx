import * as  React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
import * as marked from "marked";
import *  as prism from "prismjs";

import Canvas from "./canvas";
import 'prismjs/themes/prism-okaidia.css';

export default class Markdown extends React.Component {
  components: Map<any, any>;
  renderer: any;
  constructor(props) {
    super(props);

    this.components = new Map();

    this.renderer = new marked.Renderer();
    this.renderer.table = (header, body) => {
      return `<table class="grid"><thead>${header}</thead><tbody>${body}</tbody></table>`;
    };
  }

  componentDidMount() {
    this.renderDOM();
  }

  componentDidUpdate() {
    this.renderDOM();
  }

  renderDOM() {
    for (const [id, component] of this.components) {
      const div = document.getElementById(id);

      if (div instanceof HTMLElement) {
        ReactDOM.render(component, div);
      }
    }
    prism.highlightAll();
  }

  render() {
    const document = this.document(
      localStorage.getItem("ELEMENT_LANGUAGE") || "zh-CN"
    );
    
    // 子标题
    // document.match(/###\s?(.*)/g)
    if (typeof document === "string") {
      this.components.clear();

      const html = marked(
        (document+'').replace(/:::\s?demo\s?([^]+?):::/g, (match, p1, offset) => {
          const id = offset.toString(36);
          const _ref = this.constructor;
          const demoCodeProps = Object.assign(
            {
              name: _ref.name.toLowerCase()
            },
            this.props
          );
          this.components.set(
            id,
            React.createElement(Canvas, demoCodeProps, p1)
          );

          return `<div id=${id}></div>`;
        }),
        { renderer: this.renderer }
      );

      return (
        <div
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />
      );
    } else {
      return <span />;
    }
  }
  document(arg0: string) {
    throw new Error("Method not implemented.");
  }
}
