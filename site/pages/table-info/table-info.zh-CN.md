## TableInfo 静态数据展示

常见的详细信息，简介里面展示用的组件

### 基础用法

常见格式化静态展示详细数据

:::demo 通过 `label` 和 `value` 展示信息数据

```js
constructor(props) {
  super(props);

  this.state = {
    value: false
  }
}

onChange(e){
  console.log(e);
  this.setState({
      value:e
  });
}

render() {
    const list =  [
            {
                label: '公司名称',
                value: '宁德时代新能源科技股份有限公司'
            },
            {
                label: '英文名称',
                value: 'Contemporary Amperex Technology Co., Limited'
            },
            {
                label: '曾用名',
                value: '---'
            },
            [
                {
                    label: 'A股代码',
                    value: '300750'
                },
                {
                    label: 'A股简称',
                    value: '宁德时代'
                },
            ],
            [
                {
                    label: 'B股代码',
                    value: '--'
                },
                {
                    label: 'B股简称',
                    value: '--'
                },
            ],
            [
                {
                    label: 'H股代码',
                    value: '--'
                },
                {
                    label: 'H股代码',
                    value: '--'
                },
            ],
            [
                {
                    label: '证券类别',
                    value: '深交所创业板A股'
                },
                {
                    label: '所属东财行业',
                    value: '汽车行业'
                },
            ],
            [
                {
                    label: '上市交易所',
                    value: '深圳证券交易所'
                },
                {
                    label: '所属证监会行业',
                    value: '制造业-电气机械和器材制造业'
                },
            ],
            [
                {
                    label: '总经理',
                    value: '周佳'
                },
                {
                    label: '法人代表',
                    value: '周佳'
                },
            ],
            [
                {
                    label: '董秘',
                    value: '蒋理'
                },
                {
                    label: '董事长',
                    value: '曾毓群'
                },
            ],
            [
                {
                    label: '办公地址',
                    value: '宁德市蕉城区漳湾镇新港路2号'
                },
                {
                    label: '注册地址',
                    value: '宁德市蕉城区漳湾镇新港路2号'
                },
            ],
            [
                {
                    label: '区域',
                    value: '福建'
                },
                {
                    label: '邮政编码',
                    value: '352100'
                },
            ],
            [
                {
                    label: '注册资本(元)',
                    value: '22.1亿'
                },
                {
                    label: '工商登记',
                    value: '91350900587527783P'
                },
            ],
            [
                {
                    label: '雇员人数',
                    value: '24875'
                },
                {
                    label: '管理人员人数',
                    value: '15'
                },
            ],
            [
                {
                    label: '律师事务所',
                    value: '通力律师事务所'
                },
                {
                    label: '会计师事务所',
                    value: '致同会计师事务所(特殊普通合伙)'
                },
            ],

            {
                label: '公司简介',
                value: '宁德时代新能源科技股份有限公司成立时间2011年,总部地址中国福建。宁德核心技术为动力和储能电池领域,材料、电芯、电池系统、电池回收二次利用等全产业链研发及制造能力。主营业务CATL专注于新能源汽车动力电池系统、储能系统的研发、生产和销售,致力于为全球新能源应用提供一流解决方案。'
            }
            ,

            {
                label: '经营范围',
                value: '锂离子电池、锂聚合物电池、燃料电池、动力电池、超大容量储能电池、超级电容器、电池管理系统及可充电电池包、风光电储能系统、相关设备仪器的开发、生产和销售及售后服务;对新能源行业的投资。(依法须经批准的项目,经相关部门批准后方可开展经营活动)'
            }

        ]
  return (
    <div>
      <div>
      显示边框：<Switch checked={this.state.value} onChange={this.onChange.bind(this)} />
      </div>
      <br/>
      <TableInfo border={this.state.value} list={list}/>
    </div>
  )
}
```

:::

### Attributes

| 参数       | 说明                  | 类型    | 可选值 | 默认值                            |
| ---------- | --------------------- | ------- | ------ | --------------------------------- |
| list       | 数据列表              | Array   |        | []                                |
| labelStyle | 标签头 `CSS` 样式类型 | Object  |        | { width: 120, textAlign: 'right'} |
| border     | 是否显示边康          | boolean |        | false                             |

### list.item 数据类型

| 参数  | 说明     | 类型   | 可选值 | 默认值 |
| ----- | -------- | ------ | ------ | ------ |
| label | 标签头   | string |        |        |
| value | 数据内容 | any    |        |
| style | 样式     | Object |        |        |
| class | css 类   | string |        |        |
