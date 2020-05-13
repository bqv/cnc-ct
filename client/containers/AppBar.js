import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import ActionSearchIcon from 'material-ui/svg-icons/action/search';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import AirplanemodeActiveIcon from 'material-ui/svg-icons/device/airplanemode-active';

import NavigationButton from 'components/NavigationButton';

export default class AppBar extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const {children} = this.props;

    return (
      <Toolbar>
        <ToolbarGroup style={{paddingLeft: 20}} firstChild>
          <AirplanemodeActiveIcon color="white" style={{height: 40, width: 40, marginRight: 30}} />
          <NavigationButton to="/" label="Tracks" exact />
        </ToolbarGroup>
        <ToolbarGroup>{children}</ToolbarGroup>
      </Toolbar>
    );
  }
}
