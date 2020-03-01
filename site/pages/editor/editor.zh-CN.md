# editor 编辑器

### 基本用法

富文本编辑。

:::demo  Editor基本使用
 

```js

constructor(props){
    super(props);
    this.state = {
        value: '<p>Hello <b>World!</b></p>', // 设置编辑器初始内容
        output:'',
    }
}

render() {
  return (
    <div>
      <Editor value={this.state.value} onChange={(value)=>{
          console.log(value);
          this.setState({
              output:value
          })
      }}/>
      <div class="output">
        <h3>output:</h3>
        {this.state.output}
      </div>
    </div>
  )
}
```
<style>
.bf-container {
    border: 1px solid #d1d1d1;
    border-radius: 5px;
}
</style>
:::