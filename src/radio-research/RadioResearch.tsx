import * as React from 'react';
import { Radio } from "antd";
import './index.less';
export default class RadioResearch extends React.Component<any, any> {
  render() {
    const { list, onChange, title, value } = this.props;
    const radioStyle = {
      display: "block",
      height: "30px"
    };
    return (
      <div  >
        {!!title && <div className="ant-radio-research">{title}</div>}
        <Radio.Group onChange={onChange} value={value}>
          {list.map((el, index) => {
            return (
              <Radio style={radioStyle} key={index} value={el.value}>
                {el.label}
              </Radio>
            );
          })}
        </Radio.Group>
      </div>
    );
  }
}
