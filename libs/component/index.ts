import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Component extends React.Component<any, any> {
  classNames(...args) {
    return classnames(args);
  }

  className(...args) {
    const { className } = this.props;
    return this.classNames.apply(this, args.concat([className]));
  }

  style(args?:any) {
    const { style } = this.props;
    return Object.assign({}, args, style)
  }
}

interface Props {
  className?: string,
  style?: Object
};
