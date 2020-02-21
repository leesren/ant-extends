import React from 'react';
import PropTypes from 'prop-types';

class CustomItem extends React.Component<any,any> {
  render() {
    return (
      <div>
        <div className="name">{this.props.item.value}</div>
        <span className="addr">{this.props.item.address}</span>
      </div>
    )
  }
}
 

module.exports = CustomItem;
