import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class View extends Component<any, any> {
  render() {
    const classNames = [];
    const { show = true, className = '', children } = this.props;
    const mixed: any = { style: { ...(children as any).props.style } };
    if (!show) mixed.style.display = 'none';
    if ((children as any).props.className) classNames.push((children as any).props.className);
    if (className) classNames.push(className);
    mixed.className = classNames.join(' ');

    return React.cloneElement(React.Children.only(children  as any), mixed);
  }
}

type Props = {
  show: any,
};