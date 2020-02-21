/* @flow */

import * as React from 'react';
import { Component } from '../../libs';

type State = {
  activeNames: Array<string>
};

export default class Collapse extends Component {

  static defaultProps = {
    value: [],
    onChange() {}
  };

  constructor(props: Object) {
    super(props);
    this.state = {
      activeNames: [].concat(this.props.value)
    };
  }

  componentWillReceiveProps (nextProps: any) {
    this.setActiveNames(nextProps.value)
  }

  setActiveNames(activeNames: string | Array<string>): void {
    activeNames = [].concat(activeNames);
    this.setState({ activeNames }, () => this.props.onChange(activeNames));
  }

  handleItemClick(name: string): void {
    const { activeNames } = this.state;

    if (this.props.accordion) {
      this.setActiveNames(
        activeNames[0] && activeNames[0] === name ? '' : name
      );
    } else {
      if (activeNames.includes(name)) {
        this.setActiveNames(activeNames.filter(item => item !== name));
      } else {
        this.setActiveNames(activeNames.concat(name));
      }
    }
  }

  render() {
    const content = React.Children.map(this.props.children, (child:any, idx) => {
      const name = child.props.name || idx.toString();
      return React.cloneElement(child, {
        isActive: this.state.activeNames.includes(name),
        key: idx,
        name: name,
        onClick: item => this.handleItemClick(item as any)
      });
    });
    return (
      <div className="el-collapse">
        {content}
      </div>
    );
  }
}

// Collapse.propTypes = {
//   accordion: PropTypes.bool,
//   value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
//   onChange: PropTypes.func
// };