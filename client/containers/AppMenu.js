import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import ActionExitToAppIcon from 'material-ui/svg-icons/action/exit-to-app';
import ActionHelpOutlineIcon from 'material-ui/svg-icons/action/help-outline';
import ActionInfoOutlineIcon from 'material-ui/svg-icons/action/info-outline';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

import {showModal} from 'containers/ModalsLayout/actions';
import {apiGetTracks} from 'api/actions';
import AboutWindow from 'components/AboutWindow';
import ConfirmationDialog from 'components/ConfirmationDialog';

export class AppMenu extends React.Component {
  static propTypes = {
    openSwagger: PropTypes.func.isRequired,
    showAboutWindow: PropTypes.func.isRequired,
    showSwaggerDocs: PropTypes.func.isRequired
  };

  constructor(...args) {
    super(...args);
    this.onShowAboutWindow = this.onShowAboutWindow.bind(this);
    this.onShowSwaggerDocs = this.onShowSwaggerDocs.bind(this);
  }

  onShowSwaggerDocs() {
    this.props.showSwaggerDocs({
      text: 'Browse API?',
      onOk: (hideModal) => {
        this.props.openSwagger(() => {
          hideModal();
        });
      }
    });
  }

  onShowAboutWindow() {
    this.props.showAboutWindow();
  }

  render() {
    return (
      <section>
        <IconMenu
          desktop
          iconButtonElement={
            <FlatButton
              label="More"
              labelPosition="before"
              style={{color: 'white'}}
              icon={<NavigationExpandMoreIcon color="white" />}
            />
          }
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem primaryText="Docs" leftIcon={<ActionHelpOutlineIcon />} onClick={this.onShowSwaggerDocs} />
          <MenuItem primaryText="About" leftIcon={<ActionInfoOutlineIcon />} onClick={this.onShowAboutWindow} />
        </IconMenu>
      </section>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showAboutWindow() {
      dispatch(showModal({key: AboutWindow.NAME}));
    },
    showSwaggerDocs(props) {
      dispatch(showModal({key: ConfirmationDialog.NAME, props}));
    },
    openSwagger(callback) {
      window.open('/.api-docs', '_blank');
      callback();
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(AppMenu);
