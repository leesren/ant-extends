## RadioResearch 单选框选择题

在一组备选项中进行单选

### 基础用法

由于选项默认可见，不宜过多，若选项过多，建议使用 Select 选择器。

:::demo 要使用 Radio 组件，需要设置`value`绑定变量，可以通过`checked`来指定 Radio 的选中状态。

```js
constructor(props) {
  super(props);

  this.state = {
    value: ''
  }
}

onChange(e){
  console.log(e);
  this.setState({ 
      value:e.target.value 
  });
}

render() {
    const list = [{
        label:'1年以内',
        value:'0'
    },{
        label:'1~3年',
        value:'1'
    },{
        label:'3~5年',
        value:'2'
    },{
        label:'5年以上',
        value:'3'
    }]
  return (
    <div>
      <RadioResearch onChange={this.onChange.bind(this)} value={this.state.value} title="你参与基金投资已经多久了？" list={list}/>
    </div>
  )
}
```

:::
