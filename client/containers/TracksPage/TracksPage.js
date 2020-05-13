import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {FormattedMessage, FormattedRelative} from 'react-intl';

import {apiGetTrack, apiGetTracks} from 'api/actions';

import styles from './TracksPage.scss';

export class TracksPage extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    tracks: PropTypes.object.isRequired,
    apiGetTrack: PropTypes.func.isRequired,
    apiGetTracks: PropTypes.func.isRequired,
    tracksLastUpdate: PropTypes.number
  };

  static defaultProps = {
    tracksLastUpdate: null
  };

  componentDidMount() {
    this.props.apiGetTracks();
    setTimeout(() => this.props.apiGetTracks(), 1500);
  }

  render() {
    const {loading, tracks, tracksLastUpdate} = this.props;

    return (
      <section style={{padding: 20}}>
        <h2>
          <FormattedMessage id="app.tracks.title" defaultMessage="Tracks" />
          {tracksLastUpdate && (
            <span className={styles.lastUpdate}>
              (updated <FormattedRelative value={tracksLastUpdate} />)
            </span>
          )}
        </h2>
        <Table multiSelectable>
          <TableHeader>
            <TableRow displayBorder>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Artist</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody showRowHover>
            {tracks.map(({id, artist, title}) => (
              <TableRow key={id}>
                <TableRowColumn>{id}</TableRowColumn>
                <TableRowColumn>{artist}</TableRowColumn>
                <TableRowColumn>{title}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    loading: state.api.get('loading'),
    tracks: state.api.getIn(['data', 'tracks']),
    tracksLastUpdate: state.api.getIn(['lastUpdate', 'tracks'])
  };
}

function mapDispatchToProps(dispatch) {
  return {
    apiGetTracks() {
      dispatch(apiGetTracks());
    },
    apiGetTrack(data) {
      dispatch(apiGetTrack(data));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksPage);
