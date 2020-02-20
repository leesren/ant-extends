/* @flow */

import React from "react";
import { Component, PropTypes, Transition, View } from "../../libs";
import { Empty as AntEmpty } from "antd";
type State = {};

export default class Empty extends Component {
  state: State;

  constructor(props: Object) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <div>空空如也 sdsdsdsd</div>
        <AntEmpty />
      </div>
    );
  }
}

Empty.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  closable: PropTypes.bool,
  closeText: PropTypes.string,
  showIcon: PropTypes.bool
};

Empty.defaultProps = {
  type: "info",
  closable: true
};
