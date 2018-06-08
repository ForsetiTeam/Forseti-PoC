import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { LayerPage, Page } from '../../Layer';
import DisputesItem from './DisputesItem';

class Disputes extends Component {
  static propTypes = {
    topic: PropTypes.string,
    comment: PropTypes.string,

    list: PropTypes.array,
    filter: PropTypes.string
  };

  render() {
    return (
      <LayerPage
        topic={this.props.topic}
        comment={this.props.comment}
      >
        {this.props.list.length ?
          <Page>
            {this.props.list.map(dispute =>
              <DisputesItem key={dispute.id} dispute={dispute}/>
            )}
          </Page> :
          <div>No entries</div>
        }
      </LayerPage>
    );
  }
}

export default Disputes;
