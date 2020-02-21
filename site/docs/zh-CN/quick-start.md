## 快速上手

### 安装

```shell
npm i ant-extends --save
```

### 按需加载

结合 `babel-plugin-import`, 可以按需加载组件，减小包的大小

```shell
npm install babel-plugin-import -D
```

配置 `babel`,

下面是 `umi` 的例子

```jsx
export default {
  // 其他配置
  extraBabelPlugins: [
    [
      "import",
      {
        libraryName: "ant-extends",
        libraryDirectory: "dist/npm/es5/src",
        style: "index.less"
      },
      "ant-extends"
    ]
  ]
};
```

### 使用

```js
import React from "react";
import { RadioResearch } from "ant-extends";
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }
  onChange(e) {
    this.setState({ value: e.target.value });
  }
  render() {
    const list = [
      {
        label: "1年以内",
        value: "0"
      },
      {
        label: "1~3年",
        value: "1"
      },
      {
        label: "3~5年",
        value: "2"
      },
      {
        label: "5年以上",
        value: "3"
      }
    ];
    return (
      <div className="page-result">
        <div className="result-box">
          <div>
            <RadioResearch
              onChange={this.onChange.bind(this)}
              value={this.state.value}
              title="你参与基金投资已经多久了？"
              list={list}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Page;
```
